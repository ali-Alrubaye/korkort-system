// src/app/(auth)/reset-password/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                <p className="text-sm text-red-700 dark:text-red-200">
                  Ogiltig återställningslänk
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Begär en ny återställningslänk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm token={token} email={email} />
        </div>
      </div>
    </div>
  );
}
