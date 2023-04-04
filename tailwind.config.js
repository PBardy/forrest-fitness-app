/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["FigTree", "Arial", "sans-serif"],
      },

      colors: {
        primary: "var(--ion-color-primary)",
        primary_tint: "var(--ion-color-primary-tint)",
        secondary: "var(--ion-color-secondary)",
        tertiary: "var(--ion-color-tertiary)",
        success: "var(--ion-color-success)",
        warning: "var(--ion-color-warning)",
        danger: "var(--ion-color-danger)",
        dark: "var(--ion-color-dark)",
        medium: "var(--ion-color-medium)",
        light: "var(--ion-color-light)",
        step50: "#1e1e1e",
        step100: "#2a2a2a",
        step150: "#363636",
        step200: "#414141",
        step250: "#4d4d4d",
        step300: "#595959",
        step350: "#656565",
        step400: "#717171",
        step450: "#7d7d7d",
        step500: "#898989",
        step550: "#949494",
        step600: "#a0a0a0",
        step650: "#acacac",
        step700: "#b8b8b8",
        step750: "#c4c4c4",
        step800: "#d0d0d0",
        step850: "#dbdbdb",
        step900: "#e7e7e7",
        step950: "#f3f3f3",
      },
      keyframes: {
        grow: {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        grow: "grow 0.25s ease-in-out",
      },
    },
  },
  plugins: [],
};
