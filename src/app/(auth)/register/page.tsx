// src/app/(auth)/register/page.tsx
"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Skapa ett konto
          </h1>
          <div role="main">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
