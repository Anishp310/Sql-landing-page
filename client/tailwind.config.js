import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 3s ease-out',
      },
      colors: {
        primary: "rgb(127 29 29 / var(--tw-bg-opacity, 1))",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      filter: ['hover'],
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["light"], // Force DaisyUI to use the light theme
  },
  darkMode: 'media', // Respect the user's system preferences for dark mode
};

