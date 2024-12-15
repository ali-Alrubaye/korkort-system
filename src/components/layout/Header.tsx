// src/components/layout/Header.tsx
import { UserMenu } from "@/components/layout/UserMenu";
import { LogoutButton } from "../auth/LogoutButton";

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo eller andra navigationselement */}
          </div>

          <div className="flex items-center">
            <UserMenu />
            <div className="hidden sm:ml-4 sm:flex sm:items-center">
              <LogoutButton variant="icon" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
