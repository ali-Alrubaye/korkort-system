// src/lib/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import type { User } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Denna funktion kan endast användas i Server Components eller Server Actions
export async function getSession() {
  try {
    const token = (await cookies()).get("session");

    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/auth/session`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data as { user: User; expires: string };
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}
