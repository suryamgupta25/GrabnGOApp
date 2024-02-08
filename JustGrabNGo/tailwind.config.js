/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./assets/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'rnPurp': '#aa66ff'
      }
    },
  },
  plugins: [],
}

