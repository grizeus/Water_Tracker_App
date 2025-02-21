/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    screens: {
      sm: "320px",
      md: "768px",
      xl: "1440px",
      "3xl": "2560px",
    },
    colors: {
      "charcoal": "#2f2f2f",
      "royal": "#407bff",
      "solitude": "#ecf2ff",
    },
  },
};
export const plugins = [];
