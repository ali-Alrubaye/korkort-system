// src/app/page.tsx
import {
  Link,
  BookOpen,
  Brain,
  Target,
  Clock,
  CheckCircle2,
  Trophy,
  Users,
  Star,
  Award,
} from "lucide-react";

const stats = [
  { value: "15,000+", label: "Användare" },
  { value: "95%", label: "Godkända" },
  { value: "1,000+", label: "Övningsfrågor" },
  { value: "24/7", label: "Support" },
];

const testimonials = [
  {
    quote:
      "Bästa sättet att förbereda sig för teoriprovet. Klarade det på första försöket!",
    author: "Anna S.",
    role: "Nybliven körkortsinnehavare",
  },
  {
    quote: "Pedagogiskt upplägg och bra förklaringar. Rekommenderas starkt!",
    author: "Marcus L.",
    role: "Elev",
  },
];

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-primary via-primary-dark to-primary-light bg-clip-text text-transparent">
              Din väg till körkortet börjar här
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Vi hjälper dig att förbereda dig för teoriprovet med{" "}
            <span className="text-primary font-semibold">smarta övningar</span>,{" "}
            <span className="text-primary-dark font-semibold">
              personlig feedback
            </span>{" "}
            och{" "}
            <span className="text-primary-light font-semibold">
              beprövade metoder
            </span>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/teoriprov"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm hover:shadow"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Börja öva nu
            </Link>
            <Link
              href="/om-oss"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-background-offset text-text-primary hover:bg-background border border-border hover:border-primary transition-colors shadow-sm hover:shadow"
            >
              Läs mer om oss
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Brain,
              title: "Anpassad inlärning",
              description: "AI-driven personlig inlärningsplan",
            },
            {
              icon: Target,
              title: "Omfattande material",
              description: "Över 1000 uppdaterade övningsfrågor",
            },
            {
              icon: Clock,
              title: "Effektiv övning",
              description: "Optimerad för snabb inlärning",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-lg bg-background-offset border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="shrink-0 p-2 rounded-md bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Aktiva användare", value: "15,000+" },
            { label: "Godkända elever", value: "95%" },
            { label: "Övningsfrågor", value: "1,000+" },
            { label: "Support", value: "24/7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-lg bg-background-offset border border-border"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section className="container">
        <div className="rounded-lg border border-border bg-background-offset p-8 md:p-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary">
              Din framgång är vårt mål
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: CheckCircle2,
                  title: "Följ din utveckling",
                  description: "Se din framgång i realtid",
                },
                {
                  icon: Trophy,
                  title: "Nå dina mål",
                  description: "Klara provet på första försöket",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-4">
                  <div className="shrink-0 p-2 rounded-md bg-primary/10 text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="rounded-lg border border-border bg-background-offset p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            Redo att börja din resa?
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Skapa ett konto idag och få tillgång till alla våra övningar och
            studiematerial.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm hover:shadow"
            >
              Skapa konto
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-background text-text-primary hover:bg-background-offset border border-border hover:border-primary transition-colors shadow-sm hover:shadow"
            >
              Logga in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
