/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
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
      },
      fontFamily:{
        'open-sans': ['Open Sans', ...defaultTheme.fontFamily.sans],
        'source-sans-pro': ['Source Sans Pro', ...defaultTheme.fontFamily.sans]
      },
      padding:{
        '0.5': '2px'
      }
    },
  },
  plugins: [],
}

