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
      charcoal: "var(--charcoal-black)",
      royal: "var(--royal-blue)",
      solitude: "var(--solitude-blue)",
      jordy: "var(--jordy-blue)",
      sunshade: "var(--sunshade-orange)",
      sunset: "var(--sunset-orange)",
      hawkes: "var(--hawkes-blue)",
      perano: "var(--perano-blue)",
    },
    boxShadow: {
      sm: "var(--shadow-sm)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
    },
  },
};
export const plugins = [];
