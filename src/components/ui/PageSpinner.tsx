// src/components/ui/PageSpinner.tsx
import { LoadingSpinner } from "./LoadingSpinner";

export function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
