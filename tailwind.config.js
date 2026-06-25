/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tz: {
          dark: "#1F2937",
          earth: "#2A1F16",
          cream: "#FFFDFA",
          accent: "#D4AF37",
          kitenge: {
            brown: "#8B4513",
            orange: "#D2691E",
            gold: "#DAA520",
            tan: "#CD853F",
            dark: "#2C1810",
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'typing': 'typing 1.5s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}