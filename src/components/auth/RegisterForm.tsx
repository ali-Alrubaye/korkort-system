// src/components/auth/RegisterForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/ui/FormInput";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

type FieldError = {
  [key: string]: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    city: "",
    termsAccepted: false,
  });

  const validateForm = (): boolean => {
    const errors: FieldError = {};

    if (formData.password.length < 8) {
      errors.password = "Lösenordet måste vara minst 8 tecken långt";
    }

    if (formData.phoneNumber && !/^[0-9+\s-]{6,}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Ogiltigt telefonnummer";
    }

    if (formData.postalCode && !/^\d{3}\s?\d{2}$/.test(formData.postalCode)) {
      errors.postalCode = "Ogiltigt postnummer (t.ex. 123 45)";
    }

    if (!formData.termsAccepted) {
      errors.terms = "Du måste acceptera användarvillkoren";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Formatera postnummer innan det skickas (ta bort mellanslag)
      const formattedData = {
        ...formData,
        postalCode: formData.postalCode.replace(/\s/g, ""),
        phoneNumber: formData.phoneNumber.replace(/\s/g, ""),
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ett fel uppstod");
      }

      router.push("/verify?email=" + encodeURIComponent(formData.email));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Rensa felet för detta fält när användaren börjar skriva
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Förnamn"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={fieldErrors.firstName}
          required
          autoComplete="given-name"
        />
        <FormInput
          label="Efternamn"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={fieldErrors.lastName}
          required
          autoComplete="family-name"
        />
      </div>

      <FormInput
        label="E-post"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={fieldErrors.email}
        required
        autoComplete="email"
      />

      <div className="relative">
        <FormInput
          label="Lösenord"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Telefon"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={fieldErrors.phoneNumber}
          autoComplete="tel"
          placeholder="070-123 45 67"
        />
        <FormInput
          label="Postnummer"
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          error={fieldErrors.postalCode}
          autoComplete="postal-code"
          placeholder="123 45"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Adress"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={fieldErrors.address}
          autoComplete="street-address"
        />
        <FormInput
          label="Ort"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={fieldErrors.city}
          autoComplete="address-level2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            required
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-700 dark:text-gray-200"
          >
            Jag accepterar{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              användarvillkoren
            </Link>
          </label>
        </div>
        {fieldErrors.terms && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {fieldErrors.terms}
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Registrerar...
          </span>
        ) : (
          "Registrera"
        )}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Har du redan ett konto?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Logga in här
        </Link>
      </p>
    </form>
  );
}
