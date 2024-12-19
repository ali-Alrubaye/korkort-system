// src/app/(auth)/register/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrera dig - Körkortssystem",
  description:
    "Skapa ett konto för att börja din resa med vårt moderna körkortsutbildningssystem.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
