// src/hooks/usePublicRoute.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "Ta_bort_dessa_filer/AuthContext";

export function usePublicRoute() {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  return { user, isLoading, error };
}
