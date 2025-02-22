import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // add other paths as needed
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E3A8A', // Example deep blue
      },
    },
  },
  plugins: [],
} satisfies Config;
