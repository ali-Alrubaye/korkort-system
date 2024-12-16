// src/app/(auth)/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <LoginForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Eller fortsätt med
            </span>
          </div>
        </div>
        <GoogleButton />
      </div>
    </div>
  );
}
