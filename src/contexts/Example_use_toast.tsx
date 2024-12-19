"use client";

import { useToast } from "@/contexts/toast-context";

export function ExampleComponent() {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast("Operationen lyckades!", "success");
  };

  const handleError = () => {
    showToast("Något gick fel!", "error");
  };

  return <div>Något här</div>;
}
