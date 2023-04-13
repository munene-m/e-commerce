/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width:{
        'inherit': 'inherit',
      },
      screens:{
        'sm': '470px'
      }
    },
  },
  plugins: [],
}

