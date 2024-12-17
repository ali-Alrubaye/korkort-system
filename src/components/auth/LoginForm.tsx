// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { FormInput } from "@/components/ui/FormInput";
import Link from "next/link";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-post krävs")
    .email("Ogiltig e-postadress")
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, "Lösenord krävs"),
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [lastAttemptEmail, setLastAttemptEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setLastAttemptEmail(data.email);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard", // Lagt till denna rad
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        // Lagt till denna kontroll
        router.push(result.url); // Använd URL:en från resultatet
        router.refresh();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ett oväntat fel uppstod";

      if (errorMessage.toLowerCase().includes("lösenord")) {
        setError("password", {
          type: "server",
          message: "Felaktigt lösenord",
        });
      } else if (errorMessage.toLowerCase().includes("e-post")) {
        setError("email", {
          type: "server",
          message: "E-postadressen finns inte registrerad",
        });
      } else {
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName: keyof LoginFormData) => {
    // Rensa server-side fel när användaren börjar skriva
    if (errors[fieldName]?.type === "server") {
      clearErrors(fieldName);
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Välkommen tillbaka
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Logga in på ditt konto för att fortsätta
        </p>
      </div>

      {submitError && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4 animate-fadeIn">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">
                {submitError}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-6">
          <FormInput
            label="E-postadress"
            type="email"
            autoComplete="email"
            {...register("email", {
              onChange: () => handleFieldChange("email"),
            })}
            error={errors.email?.message}
            disabled={isSubmitting}
          />

          <div className="relative">
            <FormInput
              label="Lösenord"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password", {
                onChange: () => handleFieldChange("password"),
              })}
              error={errors.password?.message}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              disabled={isSubmitting}
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Kom ihåg mig
            </label>
          </div>

          <div className="text-sm">
            <Link
              href={{
                pathname: "/forgot-password",
                ...(lastAttemptEmail && {
                  query: { email: lastAttemptEmail },
                }),
              }}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Glömt lösenord?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty || !isValid}
          className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Loggar in...
            </span>
          ) : (
            "Logga in"
          )}
        </button>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
              eller
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Inte medlem?
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Registrera dig här
          </Link>
        </p>
      </form>
    </div>
  );
}
