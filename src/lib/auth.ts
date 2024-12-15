// src/lib/auth.ts
import type { SignUpData } from "Ta_bort_dessa_filer/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Inloggningen misslyckades");
  }

  return response.json();
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Utloggningen misslyckades");
  }

  return response.json();
}

export async function registerUser(data: SignUpData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registreringen misslyckades");
  }

  return response.json();
}
