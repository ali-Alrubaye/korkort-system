// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`  
        p-2 rounded-lg transition-colors duration-200  
        bg-white/10 backdrop-blur-sm  
        hover:bg-white/20  
        dark:bg-black/10 dark:hover:bg-black/20  
      `}
      aria-label={
        theme === "dark" ? "Växla till ljust läge" : "Växla till mörkt läge"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-500" />
      )}
      <span className="sr-only">
        {theme === "dark" ? "Växla till ljust läge" : "Växla till mörkt läge"}
      </span>
    </button>
  );
}
