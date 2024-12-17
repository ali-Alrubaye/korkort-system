// src/contexts/auth-context.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Role, Status } from "@prisma/client";
import { SessionUser } from "@/types/auth";
import { hasPermission, Permission, isRoleAtLeast } from "@/lib/roles";

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  hasPermission: (permission: Permission) => boolean;
  isAtLeastRole: (role: Role) => boolean;
  status: Status | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const clearError = () => {
    // Implementera felhantering vid behov
  };

  const handleSignIn = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Inloggningen misslyckades");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      throw new Error("Utloggningen misslyckades");
    }
  };

  const checkPermission = (permission: Permission): boolean => {
    if (!session?.user?.role) return false;
    return hasPermission(session.user.role, permission);
  };

  const checkRole = (requiredRole: Role): boolean => {
    if (!session?.user?.role) return false;
    return isRoleAtLeast(session.user.role, requiredRole);
  };

  const value: AuthContextType = {
    user: session?.user ?? null,
    isLoading: sessionStatus === "loading",
    isAuthenticated: sessionStatus === "authenticated",
    error: null,
    signIn: handleSignIn,
    signOut: handleSignOut,
    clearError,
    hasPermission: checkPermission,
    isAtLeastRole: checkRole,
    status: session?.user?.status ?? null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
