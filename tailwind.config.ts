// tailwind.config.ts
import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
        },
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      typography: {
        h1: "text-4xl md:text-5xl font-bold",
        h2: "text-3xl md:text-4xl font-semibold",
        h3: "text-2xl md:text-3xl font-semibold",
        body: "text-base md:text-lg",
        small: "text-sm",
      },
      containers: {
        sm: "640px", // Mobil landskapsläge
        md: "768px", // Tablets
        lg: "1024px", // Laptops
        xl: "1280px", // Desktop
        "2xl": "1536px", // Stora skärmar
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
      spacing: {
        "layout-sm": "1rem",
        "layout-md": "2rem",
        "layout-lg": "4rem",
        "section-sm": "2rem",
        "section-md": "4rem",
        "section-lg": "6rem",
      },
      fontSize: {
        "heading-1": ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        "heading-2": ["2rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        "heading-3": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "body-large": ["1.125rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
      },
      borderRadius: {
        card: "0.5rem",
        button: "0.375rem",
        input: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.2s ease-in-out",
        "fade-out": "fadeOut 0.2s ease-in-out",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        theme: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        theme: "300ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
