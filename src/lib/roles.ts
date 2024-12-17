// src/lib/roles.ts
import { Role } from "@prisma/client";

// Hjälpfunktion för att validera Role
export const isValidRole = (role: string): role is Role => {
  return Object.values(Role).includes(role as Role);
};

// Rollhierarki - högre nummer = högre behörighet
export const ROLE_LEVELS: Record<Role, number> = {
  [Role.FREE_USER]: 1,
  [Role.PREMIUM_USER]: 2,
  [Role.ADMIN]: 3,
} as const;

// Definiera behörigheter för olika delar av systemet
export const PERMISSIONS = {
  VIEW_QUESTIONS: [Role.FREE_USER, Role.PREMIUM_USER, Role.ADMIN],
  CREATE_REPORTS: [Role.FREE_USER, Role.PREMIUM_USER, Role.ADMIN],
  MANAGE_QUESTIONS: [Role.ADMIN],
  MANAGE_USERS: [Role.ADMIN],
  VIEW_ANALYTICS: [Role.PREMIUM_USER, Role.ADMIN],
  ACCESS_PREMIUM_CONTENT: [Role.PREMIUM_USER, Role.ADMIN],
} as const;

export type Permission = keyof typeof PERMISSIONS;

// Hjälpfunktioner för rollkontroll
export const hasPermission = (
  userRole: Role,
  permission: Permission
): boolean => {
  return PERMISSIONS[permission].some((role) => role === userRole);
};

export const isRoleAtLeast = (userRole: Role, requiredRole: Role): boolean => {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole];
};

export const getRolePermissions = (
  role: Role
): (keyof typeof PERMISSIONS)[] => {
  return Object.entries(PERMISSIONS)
    .filter(([_, allowedRoles]) => allowedRoles.some((r) => r === role))
    .map(([permission]) => permission as keyof typeof PERMISSIONS);
};

// Route-specifika behörighetsregler
export const PROTECTED_ROUTES: Record<string, Role[]> = {
  "/dashboard/admin": [Role.ADMIN],
  "/dashboard/premium": [Role.PREMIUM_USER, Role.ADMIN],
  "/dashboard/reports": [Role.FREE_USER, Role.PREMIUM_USER, Role.ADMIN],
} as const;

export const canAccessRoute = (path: string, userRole: Role): boolean => {
  const route = Object.entries(PROTECTED_ROUTES).find(([route]) =>
    path.startsWith(route)
  );

  if (!route) return true;
  return route[1].some((role) => role === userRole);
};
