/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
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
  plugins: [
    plugin(function ({ addVariant, e, postcss}){
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`
        })
      })
    })
  ],
}

