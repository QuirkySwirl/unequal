import typography from '@tailwindcss/typography'; // Import using ES Module syntax

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // Use the imported plugin
  ],
};
