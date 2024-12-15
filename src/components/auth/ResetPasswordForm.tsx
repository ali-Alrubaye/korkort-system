// src/components/auth/ResetPasswordForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/ui/FormInput";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Lösenordet måste vara minst 8 tecken")
      .regex(/[A-Z]/, "Måste innehålla minst en versal")
      .regex(/[a-z]/, "Måste innehålla minst en gemen")
      .regex(/[0-9]/, "Måste innehålla minst en siffra"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden matchar inte",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
  email: string;
}

export function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      router.push("/login?reset=success");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Ett oväntat fel uppstod"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Återställ lösenord
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Välj ett nytt lösenord för ditt konto
        </p>
      </div>

      <FormInput
        label="Nytt lösenord"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <FormInput
        label="Bekräfta lösenord"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
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
            Uppdaterar...
          </>
        ) : (
          "Uppdatera lösenord"
        )}
      </button>
    </form>
  );
}
