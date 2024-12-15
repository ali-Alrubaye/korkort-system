// src/components/ui/LoadingSpinner.tsx
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      role="status"
      className={`flex justify-center items-center ${className}`}
    >
      <Loader2
        className={`  
          animate-spin text-blue-600 dark:text-blue-500   
          ${sizeClasses[size]}  
        `}
      />
      <span className="sr-only">Laddar...</span>
    </div>
  );
}
