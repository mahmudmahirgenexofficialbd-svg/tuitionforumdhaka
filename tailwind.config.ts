import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF3FF", 100: "#DCE6FF", 200: "#B9CDFF", 300: "#8AAAF7", 400: "#5C82EA",
          500: "#3A5FD3", 600: "#2645B0", 700: "#1E3790", 800: "#1A2E75", 900: "#14224F", 950: "#0C1533",
        },
        marigold: { 50: "#FFF8E6", 100: "#FFEDBF", 400: "#FFC247", 500: "#F9A825", 600: "#E08A00", 700: "#B36B00" },
        paper: "#F5F6FA",
        ink: "#101828",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 4px 16px -6px rgba(20,34,79,.10)",
        lift: "0 2px 4px rgba(16,24,40,.05), 0 18px 40px -16px rgba(20,34,79,.28)",
      },
    },
  },
  plugins: [],
};
export default config;
