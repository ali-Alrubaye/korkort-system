// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  status: UserStatus;
}

export type UserRole = "ADMIN" | "FREE_USER" | "PREMIUM_USER";
export type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export interface Session {
  user: User;
  expires: Date;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}
