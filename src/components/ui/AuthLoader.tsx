"use client";

import { LoadingSpinner } from "./LoadingSpinner";

export function AuthLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
