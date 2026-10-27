import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1622",
          900: "#101E30",
          800: "#16283F",
          700: "#1E3A5F",
        },
        gold: {
          400: "#DCB96B",
          500: "#C9A24B",
          600: "#A9823A",
        },
        harbor: {
          400: "#4CAF9E",
          500: "#2F8F7A",
          600: "#237362",
        },
        paper: "#F5F7FA",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "stamp-lines":
          "repeating-linear-gradient(0deg, transparent, transparent 3px, currentColor 3px, currentColor 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
