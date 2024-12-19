// src/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth-context";
import { ToastProvider } from "@/contexts/toast-context";
import { AuthLoader } from "@/components/ui/AuthLoader";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <ToastProvider>
          <Suspense fallback={<AuthLoader />}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </ToastProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
