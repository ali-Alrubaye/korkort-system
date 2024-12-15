// Toast.tsx
"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`  
          flex items-center p-4 rounded-lg shadow-lg max-w-md  
          ${
            type === "success"
              ? "bg-green-50 text-green-900 dark:bg-green-900/30 dark:text-green-100"
              : "bg-red-50 text-red-900 dark:bg-red-900/30 dark:text-red-100"
          }  
        `}
      >
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 mr-3" />
        ) : (
          <XCircle className="h-5 w-5 mr-3" />
        )}
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
