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
    fontFamily: {
      sans: "var(--inter-font), ui-sans-serif, system-ui",
      serif: "var(--abrilFat-font), ui-serif, Georgia",
      button: "var(--sourcePro-font), ui-serif, ui-sans-serif",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
