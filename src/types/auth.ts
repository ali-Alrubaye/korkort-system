// src/types/auth.ts
import "next-auth";
import { Role, Status } from "@prisma/client";
import { Session } from "next-auth";

// Bas användare interface
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  status: Status;
}

// JWT Payload interface
export interface JWTPayload {
  id: string;
  email: string;
  role: Role;
  status: Status;
  firstName: string | null;
  lastName: string | null;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

// NextAuth utökningar
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: Role;
    status: Status;
    firstName: string | null;
    lastName: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      status: Status;
      firstName: string | null;
      lastName: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<JWTPayload, "iat" | "exp" | "iss" | "aud"> {
    email: string;
    role: Role;
    status: Status;
    firstName: string | null;
    lastName: string | null;
  }
}

// Helper types
export type AuthUser = User;
export type SessionUser = Session["user"];
