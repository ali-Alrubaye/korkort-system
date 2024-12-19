// src/components/layout/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Företagsinformation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Körkort System
            </h3>
            <p className="text-text-secondary">
              Ett modernt system för körkortsutbildning som hjälper dig på vägen
              mot ditt körkort.
            </p>
          </div>

          {/* Snabblänkar */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">
              Snabblänkar
            </h4>
            <ul className="space-y-2">
              {["Teoriprov", "Övningar", "Priser", "Kontakt"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {["FAQ", "Hjälp", "Villkor", "Integritetspolicy"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">
              Kontakta oss
            </h4>
            <div className="space-y-2 text-text-secondary">
              <p>Email: info@korkortsystem.se</p>
              <p>Tel: 08-123 45 67</p>
              <p>Öppettider: Mån-Fre 09:00-17:00</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-text-muted">
            © {new Date().getFullYear()} Körkort System. Alla rättigheter
            förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
