// src/contexts/auth-context.tsx
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>; // Lägg till rememberMe
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
  clearError: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, rememberMe }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Inloggningen misslyckades");
        }

        const userData = await response.json();
        setUser(userData);
        router.push("/dashboard");
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ett oväntat fel uppstod")
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Utloggningen misslyckades")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const value = {
    user,
    isLoading,
    error,
    signIn,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
