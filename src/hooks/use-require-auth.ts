// src/hooks/use-require-auth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function useRequireAuth(redirectTo = "/login") {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, redirectTo, router]);

  return { user, isLoading, error };
}
