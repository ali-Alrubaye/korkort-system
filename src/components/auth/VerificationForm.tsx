// src/components/auth/VerificationForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "../ui/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const verificationSchema = z.object({
  code: z.string().length(6, "Verifieringskoden måste vara 6 siffror"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
  email: string;
}

export default function VerificationForm({ email }: VerificationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  const onSubmit = async (data: VerificationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: data.code }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      router.push("/dashboard");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ett fel uppstod vid verifiering"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setResendTimer(60);

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte skicka ny kod");
      }

      const intervalId = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Kunde inte skicka ny verifieringskod"
      );
      setResendDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Verifieringskod"
        type="text"
        {...register("code")}
        error={errors.code?.message}
        disabled={isSubmitting}
        placeholder="123456"
      />

      {submitError && (
        <div className="text-sm text-red-500 text-center">{submitError}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          "Verifiera"
        )}
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={resendDisabled}
          className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resendDisabled ? `Skicka ny kod (${resendTimer}s)` : "Skicka ny kod"}
        </button>
      </div>
    </form>
  );
}
