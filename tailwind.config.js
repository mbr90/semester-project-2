/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        button: ["6px 6px 16px rgba(0, 0, 0, 0.50)"],
      },
      spacing: {
        mobMargin: "30px",
      },
    },
    colors: {
      midnightBlue: "#2B2D34",
      current: "currentColor",
      whyte: "#ffffffb3",
      myWhite: "#ffffff",
      myBlack: "#000000",
      sunnyOrange: "#FFA500",
      plumWine: "#632139",
      cherryRed: "#A10D0D",
      burgundyVelvet: "#492E38",
    },

    keyframes: {
      menuAnimation: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      mobAnimation: {
        "0%": { opacity: 0, transform: "translateX(200%)" },
        "100%": { opacity: 1, transform: "translateX(0%)" },
      },
      mobOutAnimation: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(200%)" },
      },
    },

    animation: {
      menuAnimation: "menuAnimation 0.2s ease-out forwards ",
      mobAnimation: "mobAnimation 0.3s ease-out forwards ",
      mobOutAnimation: "mobOutAnimation 0.6s ease-out forwards ",
    },

    fontFamily: {
      sans: "var(--inter-font), ui-sans-serif, system-ui",
      serif: "var(--abrilFat-font), ui-serif, Georgia",
      button: "var(--sourcePro-font), ui-serif, ui-sans-serif",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
