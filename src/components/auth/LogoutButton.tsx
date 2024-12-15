// src/components/auth/LogoutButton.tsx
"use client";

import { useAuth } from "Ta_bort_dessa_filer/AuthContext";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?: "icon" | "full";
  className?: string;
}

export function LogoutButton({
  variant = "full",
  className = "",
}: LogoutButtonProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (confirm("Är du säker på att du vill logga ut?")) {
      await logout();
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleLogout}
        className={`p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ${className}`}
        title="Logga ut"
      >
        <LogOut className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full ${className}`}
    >
      <LogOut className="h-5 w-5" />
      <span>Logga ut</span>
    </button>
  );
}
