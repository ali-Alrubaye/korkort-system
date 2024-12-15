// src/lib/auth/session.ts
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "@/lib/db";
import type { User } from "@/types/auth";

export interface Session {
  user: User;
  expires: Date;
}

export async function getServerSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return null;
    }

    const decoded = await verifyToken(token.value);

    // Verifiera att användaren fortfarande existerar och är aktiv
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
        status: "ACTIVE",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      user,
      expires: new Date(decoded.exp * 1000),
    };
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

export async function createServerSession(user: User): Promise<void> {
  // Implementera om behövs
}

export async function destroyServerSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}
