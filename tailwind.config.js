/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        google: {
          blue: "#1A73E8",
          gray: "#5F6368",
          surface: "#F8F9FA",
          border: "#DADCE0",
        }
      },
    },
  },
  plugins: [],
}