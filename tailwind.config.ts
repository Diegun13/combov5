import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "UFD-nameplate": "#ffc640",
        "UFD-bg": "#151515",
        "UFD-Combo-bg": "#222",
        "UFD-Char-bg": "#333"
      },
      fontFamily: {
        poppins: ["Poppins" , "sans-serif"],
      },
      dropShadow: {
        xl: "1px 1px 6px #111",
      },
      extend: {
        visibility: ["group-hover"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config