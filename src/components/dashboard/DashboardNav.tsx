// src/components/dashboard/DashboardNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

// Nav items configuration
const navItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Översikt",
  },
  {
    href: "/dashboard/profile",
    icon: User,
    label: "Profil",
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Inställningar",
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Nav Items */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                KörkortSystem
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`  
                      inline-flex items-center px-1 pt-1 text-sm font-medium  
                      transition-colors duration-200  
                      ${
                        isActive
                          ? "border-b-2 border-primary-500 text-gray-900 dark:text-white"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      }  
                    `}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden sm:flex sm:items-center">
            <button
              onClick={signOut}
              className="  
                inline-flex items-center px-4 py-2 rounded-md  
                text-sm font-medium text-gray-700 dark:text-gray-200  
                hover:bg-gray-100 dark:hover:bg-gray-700  
                transition-colors duration-200  
              "
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logga ut
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="  
                inline-flex items-center justify-center p-2 rounded-md  
                text-gray-400 hover:text-gray-500 hover:bg-gray-100  
                dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700  
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500  
              "
            >
              <span className="sr-only">Öppna huvudmenyn</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`  
                    block pl-3 pr-4 py-2 text-base font-medium  
                    transition-colors duration-200  
                    ${
                      isActive
                        ? "bg-primary-50 border-l-4 border-primary-500 text-primary-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }  
                  `}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
            <button
              onClick={signOut}
              className="  
                w-full text-left pl-3 pr-4 py-2  
                flex items-center text-base font-medium  
                text-gray-500 hover:bg-gray-50 hover:text-gray-700  
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  
                transition-colors duration-200  
              "
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logga ut
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
