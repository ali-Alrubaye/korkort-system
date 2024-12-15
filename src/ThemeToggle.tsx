// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Undvik hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`btn btn-ghost p-2 ${
          theme === "light" ? "text-blue-600 dark:text-blue-400" : ""
        }`}
        aria-label="Ljust läge"
      >
        <Sun className="h-5 w-5" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`btn btn-ghost p-2 ${
          theme === "dark" ? "text-blue-600 dark:text-blue-400" : ""
        }`}
        aria-label="Mörkt läge"
      >
        <Moon className="h-5 w-5" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`btn btn-ghost p-2 ${
          theme === "system" ? "text-blue-600 dark:text-blue-400" : ""
        }`}
        aria-label="Systemläge"
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  );
}
