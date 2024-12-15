// src/components/layout/UserMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useAuth } from "Ta_bort_dessa_filer/AuthContext";
import { LogoutButton } from "../auth/LogoutButton";

export function UserMenu() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative ml-3" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span className="sr-only">Öppna användarmeny</span>
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {user.email}
            </p>
          </div>

          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Din profil
          </a>

          <a
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Inställningar
          </a>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
