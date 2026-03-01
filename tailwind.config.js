/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ativa o modo escuro via classe 'dark'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};