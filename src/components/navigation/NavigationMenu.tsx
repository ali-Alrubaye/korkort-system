// src/components/navigation/NavigationMenu.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Menu, X, ChevronDown, Sun, Moon, User } from "lucide-react";
import { mainNavigation, userNavigation } from "@/config/navigation";
import { NavigationItem } from "@/types/navigation";

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const isLoading = status === "loading";

  useEffect(() => {
    setMounted(true);
  }, []);

  const getUserDisplayName = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || "";
  };

  const renderNavLink = (item: NavigationItem, mobile = false) => {
    const isActive = pathname.startsWith(item.href);
    const baseClasses = mobile
      ? "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
      : "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

    const activeClasses = mobile
      ? "border-primary text-text-primary bg-background-offset"
      : "border-primary text-text-primary";

    const inactiveClasses = mobile
      ? "border-transparent text-text-secondary hover:bg-background-offset"
      : "border-transparent text-text-secondary hover:text-text-primary";

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
        onClick={() => mobile && setIsOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  const renderUserNav = (mobile = false) => {
    if (isLoading) {
      return (
        <div className="h-8 w-8 animate-pulse bg-background-offset rounded-full" />
      );
    }

    if (!session) {
      return (
        <div
          className={`${
            mobile ? "space-y-1 px-4" : "flex items-center space-x-4"
          }`}
        >
          <Link
            href="/login"
            className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => mobile && setIsOpen(false)}
          >
            Logga in
          </Link>
          <Link
            href="/register"
            className="bg-primary text-white hover:bg-primary-hover px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => mobile && setIsOpen(false)}
          >
            Registrera
          </Link>
        </div>
      );
    }

    return (
      <div className={mobile ? "space-y-1" : "relative ml-3"}>
        {mobile ? (
          <>
            <div className="px-4 py-2">
              <p className="text-base font-medium text-text-primary">
                {getUserDisplayName(session.user)}
              </p>
              <p className="text-sm font-medium text-text-secondary">
                {session.user?.email}
              </p>
            </div>
            {userNavigation.map((item) => (
              <div key={item.name}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex w-full items-center px-4 py-2 text-base font-medium text-text-secondary hover:bg-background-offset"
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-base font-medium text-text-secondary hover:bg-background-offset"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex rounded-md bg-background-offset text-text-primary hover:bg-background-offset focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="sr-only">Öppna användaremeny</span>
              <div className="h-8 w-8 rounded-full bg-background-offset flex items-center justify-center">
                <User className="h-5 w-5 text-text-secondary" />
              </div>
              <span className="text-sm font-medium">
                {getUserDisplayName(session.user)}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-md ring-1 ring-border">
                {userNavigation.map((item) => (
                  <div key={item.name}>
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="flex w-full items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-offset"
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-offset"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Vänster sida */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-text-primary">
                Körkort
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {mainNavigation.map((item) => renderNavLink(item))}
            </div>
          </div>

          {/* Höger sida */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md bg-background-offset text-text-secondary hover:text-text-primary"
                aria-label="Växla tema"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            {renderUserNav()}
          </div>

          {/* Mobil meny knapp */}
          <div className="flex items-center space-x-2 sm:hidden">
            {/* Tema-växlare för mobil */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md bg-background-offset text-text-secondary hover:text-text-primary"
                aria-label="Växla tema"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background-offset focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="sr-only">
                {isOpen ? "Stäng meny" : "Öppna meny"}
              </span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil meny */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {mainNavigation.map((item) => renderNavLink(item, true))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            {renderUserNav(true)}
          </div>
        </div>
      )}

      {/* Klicka utanför för att stänga profilmenyn */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
}
