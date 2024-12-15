// src/components/auth/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { FormInput } from "@/components/ui/FormInput";

const forgotPasswordSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ett fel uppstod vid återställning av lösenord");
      }

      setIsSubmitted(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Ett oväntat fel uppstod"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          Kontrollera din e-post
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Om e-postadressen finns i vårt system kommer du att få instruktioner
          för att återställa ditt lösenord.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Glömt lösenord?
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ange din e-postadress så skickar vi instruktioner för att återställa
          ditt lösenord.
        </p>
      </div>

      <FormInput
        label="E-postadress"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Skickar...
          </>
        ) : (
          "Skicka återställningslänk"
        )}
      </button>

      <div className="text-sm text-center">
        <a
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Tillbaka till inloggning
        </a>
      </div>
    </form>
  );
}
