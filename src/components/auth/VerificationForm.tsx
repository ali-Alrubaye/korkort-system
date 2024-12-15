// src/components/auth/VerificationForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/ui/FormInput";

const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Verifieringskoden måste vara 6 siffror")
    .regex(/^\d+$/, "Endast siffror är tillåtna"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
  email: string;
}

export function VerificationForm({ email }: VerificationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  const onSubmit = async (data: VerificationFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: data.code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Omdirigera till dashboard efter lyckad verifiering
      router.push("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Ett oväntat fel uppstod"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Ett oväntat fel uppstod"
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verifiera din e-postadress
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          En verifieringskod har skickats till {email}
        </p>
      </div>

      <FormInput
        label="Verifieringskod"
        type="text"
        maxLength={6}
        {...register("code")}
        error={errors.code?.message}
      />

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Verifierar...
            </>
          ) : (
            "Verifiera"
          )}
        </button>

        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          {isResending ? "Skickar..." : "Skicka ny kod"}
        </button>
      </div>
    </form>
  );
}
