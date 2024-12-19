"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { Role, Status } from "@prisma/client";
import {
  SessionUser,
  AuthState,
  AuthError,
  LoginCredentials,
} from "@/types/auth";
import { hasPermission, Permission, isRoleAtLeast } from "@/lib/roles";

interface AuthContextType extends AuthState {
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  hasPermission: (permission: Permission) => boolean;
  isAtLeastRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const clearError = () => setError(null);

  const handleSignIn = async ({
    email,
    password,
    rememberMe,
  }: LoginCredentials) => {
    try {
      clearError();
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError(result.error);
        throw new Error(result.error);
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Inloggningen misslyckades";
      setError(message);
      throw new Error(message);
    }
  };

  const handleSignOut = async () => {
    try {
      clearError();
      await nextAuthSignOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      const message = "Utloggningen misslyckades";
      setError(message);
      throw new Error(message);
    }
  };

  const checkPermission = (permission: Permission): boolean => {
    if (!session?.user?.role) return false;
    return hasPermission(session.user.role, permission);
  };

  const checkRole = (requiredRole: Role): boolean => {
    if (!session?.user?.role) return false;
    return isRoleAtLeast(session.user.role, requiredRole);
  };

  const value: AuthContextType = {
    user: session?.user ?? null,
    isLoading,
    isAuthenticated,
    error,
    signIn: handleSignIn,
    signOut: handleSignOut,
    clearError,
    hasPermission: checkPermission,
    isAtLeastRole: checkRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
