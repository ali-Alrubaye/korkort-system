// src/types/auth.ts
import { Role, Status } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";
import { JWTPayload as JoseJWTPayload } from "jose";

// Bas interface för användardata
export interface BaseUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  status: Status;
}

// Auth User interface
export interface AuthUser extends BaseUser {
  password?: string;
  emailVerified?: Date | null;
}

// Interface för adaptrar
export interface CustomAdapterUser extends AdapterUser, BaseUser {}

// JWT Payload interface som extends jose's JWTPayload
export interface JWTPayload extends JoseJWTPayload {
  id: string;
  email: string;
  role: Role;
  [key: string]: unknown; // Index signature för att matcha jose's JWTPayload
}

// Auth Error interface  OLd version
// export interface AuthError extends Error {
//   code?: string;
//   statusCode?: number;
// }

// NextAuth modulutökningar för User old version
// declare module "next-auth" {
//   interface User extends BaseUser {}

//   interface Session {
//     user: BaseUser & {
//       email: string;
//     };
//     expires: string;
//   }
// }

// NextAuth modulutökningar för JWT old version
// declare module "next-auth/jwt" {
//   interface JWT extends Omit<BaseUser, "email"> {
//     email?: string | null;
//     iat?: number;
//     exp?: number;
//     jti?: string;
//   }
// }

// Google OAuth profil
export interface GoogleProfile {
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  sub: string;
}

// Session User type
export interface SessionUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  status: Status;
}

// Auth State type
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: SessionUser | null;
  error: string | null;
}

// Auth Error types
export interface AuthError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Login credentials type
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// NextAuth modulutökningar
declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }

  interface User extends SessionUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<SessionUser, "emailVerified"> {
    iat: number;
    exp: number;
    jti: string;
  }
}
