// src/types/next-auth.d.ts
import { Role, Status } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: Role;
    status: Status;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: Role;
    status: Status;
  }
}
