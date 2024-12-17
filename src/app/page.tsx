import {
  Link,
  BookOpen,
  Brain,
  Target,
  Clock,
  CheckCircle2,
  Trophy,
} from "lucide-react";

// src/app/page.tsx
export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section med förbättrad design */}
      <section className="text-center space-y-8 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Din väg till körkortet börjar här
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Vi hjälper dig att förbereda dig för teoriprovet med{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            smarta övningar
          </span>
          ,{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            personlig feedback
          </span>{" "}
          och{" "}
          <span className="text-violet-600 dark:text-violet-400 font-semibold">
            beprövade metoder
          </span>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link
            href="/teoriprov"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <BookOpen className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            Börja öva nu
          </Link>
          <Link
            href="/om-oss"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
          >
            Läs mer om oss
          </Link>
        </div>
      </section>

      {/* Features Section med moderna kort */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Brain,
            title: "Anpassad inlärning",
            description:
              "Vårt AI-drivna system anpassar sig efter dina behov och inlärningsstil.",
          },
          {
            icon: Target,
            title: "Omfattande frågebank",
            description:
              "Över 1000 uppdaterade frågor med detaljerade förklaringar.",
          },
          {
            icon: Clock,
            title: "Realistiska övningsprov",
            description:
              "Förbered dig med tidsbegränsade prov i verklig miljö.",
          },
        ].map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl transition-all duration-200 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative space-y-4 p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Progress Section med modernare design */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-12">
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Din framgång är vårt mål
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "Följ din utveckling",
                description:
                  "Se din framgång över tid och fokusera på förbättringsområden.",
              },
              {
                icon: Trophy,
                title: "Bli redo för provet",
                description:
                  "Maximera dina chanser att klara teoriprovet på första försöket.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start space-x-4 group">
                <div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-900/30 transform transition-transform group-hover:scale-110">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section med förbättrad design */}
      <section className="text-center space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Redo att börja din resa?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Skapa ett konto idag och få tillgång till alla våra övningar och
          studiematerial. Din framgång börjar här.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link
            href="/register"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Skapa konto
          </Link>
          <Link
            href="/login"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
          >
            Logga in
          </Link>
        </div>
      </section>
    </div>
  );
}
