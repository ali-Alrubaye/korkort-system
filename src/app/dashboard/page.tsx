// src/app/dashboard/layout.tsx
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </main>
    </div>
  );
}
