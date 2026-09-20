import type { Config } from "tailwindcss";

/**
 * Tuition Forum Dhaka — design tokens
 *
 * Palette (see README > Design System for rationale):
 *   ink     #12141F  primary text, near-black but not pure black
 *   paper   #F7F7FB  page background, soft cool off-white
 *   canal   #16265C  primary brand — deep royal blue ("canal" as in the
 *                    rivers/waterways motif used sparingly in iconography)
 *   canal-2 #223B8F  interactive/hover state of primary
 *   marigold #C68A1E warm gold accent — used for verification, ratings,
 *                    highlights; evokes trust/achievement without leaning
 *                    on generic "SaaS blue + orange" contrast
 *   mint    #1E7F5C  success / positive status
 *   clay    #B84A32  warning / rejected / destructive
 *   mist    #E7E9F3  borders, dividers, subtle fills
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12141F",
        paper: "#F7F7FB",
        canal: {
          DEFAULT: "#16265C",
          50: "#EEF1FA",
          100: "#D7DCF2",
          200: "#AFB9E5",
          300: "#8796D8",
          400: "#5F73CA",
          500: "#3A4CA0",
          600: "#223B8F",
          700: "#16265C",
          800: "#101B44",
          900: "#0B132F",
        },
        marigold: {
          DEFAULT: "#C68A1E",
          50: "#FBF3E2",
          100: "#F5E2B8",
          200: "#EACB80",
          300: "#DFB44C",
          400: "#C68A1E",
          500: "#A6720F",
          600: "#7E560B",
        },
        mint: {
          DEFAULT: "#1E7F5C",
          50: "#E7F5EF",
          100: "#C3E6D7",
          500: "#1E7F5C",
          600: "#166646",
        },
        clay: {
          DEFAULT: "#B84A32",
          50: "#FBEAE5",
          100: "#F2C7BA",
          500: "#B84A32",
          600: "#963A26",
        },
        mist: {
          DEFAULT: "#E7E9F3",
          100: "#F1F2F9",
          200: "#E7E9F3",
          300: "#D3D6E8",
        },
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 20, 45, 0.04), 0 8px 24px -12px rgba(17, 20, 45, 0.12)",
        raised: "0 4px 10px rgba(17, 20, 45, 0.06), 0 16px 40px -16px rgba(17, 20, 45, 0.18)",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
