/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFBF2",
        ink: "#14110F",
        surface: "#FFFFFF",
        raised: "#FFF1D6",
        line: "rgba(20,17,15,0.14)",
        muted: "#6B645C",
        cyan: "#00B8C4",
        pink: "#FE2C55",
        sun: "#FFC933",
      },
      fontFamily: {
        sans: ["'Anuphan'", "system-ui", "sans-serif"],
        mono: ["'Anuphan'", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: { rise: "rise 0.7s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};
