// tailwind.config.ts
import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
// tailwind.config.js
const colors = {
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
};
// Font-storlekar
const typography = {
  h1: "text-4xl md:text-5xl font-bold",
  h2: "text-3xl md:text-4xl font-semibold",
  h3: "text-2xl md:text-3xl font-semibold",
  body: "text-base md:text-lg",
  small: "text-sm",
};
// Containers
const containers = {
  page: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-8 md:py-12 lg:py-16",
  card: "p-4 md:p-6 rounded-lg shadow-md",
};
// Standard breakpoints
const breakpoints = {
  sm: "640px", // Mobil landskapsläge
  md: "768px", // Tablets
  lg: "1024px", // Laptops
  xl: "1280px", // Desktop
  "2xl": "1536px", // Stora skärmar
};
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
