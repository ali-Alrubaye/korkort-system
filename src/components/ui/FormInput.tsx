// src/components/ui/FormInput.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="space-y-1">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          {label}
        </label>

        <div className="relative mt-2">
          <input
            ref={ref}
            type={inputType}
            suppressHydrationWarning
            data-suppress-hydration-warning="true"
            className={`  
              w-full px-4 py-2 border border-gray-300 bg-white dark:border-gray-600   
              rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400   
              focus:border-transparent dark:bg-gray-700 dark:text-white   
              transition-all duration-200  
              ${error ? "ring-red-500 dark:ring-red-500" : ""}  
              ${type === "password" ? "pr-10" : ""}  
              ${className}  
            `}
            {...props}
          />

          {mounted && type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
