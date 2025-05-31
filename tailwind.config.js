/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#010127',
        secondary: '#FFFFFF',
      },
      fontFamily: {
        typeWritter: ['typeWritter', 'monospace'],
        manrope: ['Manrope', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
