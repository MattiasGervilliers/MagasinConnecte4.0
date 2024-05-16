import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        _primary: {
          50: '#ecfbff',
          100: '#d4f4ff',
          200: '#b2eeff',
          300: '#7de7ff',
          400: '#40d5ff',
          500: '#14b7ff',
          600: '#0098ff',
          700: '#0080ff',
          800: '#0066cc',
          900: '#0857a0',
          950: '#0a3561'
        },

        _secondary: {
          50: '#fffee7',
          100: '#fffec1',
          200: '#fff886',
          300: '#ffec41',
          400: '#ffdb0d',
          500: '#ffcc00',
          600: '#d19500',
          700: '#a66a02',
          800: '#89530a',
          900: '#74430f',
          950: '#442304'
        },

        _tertiary: {
          50: '#effbff',
          100: '#def6ff',
          200: '#b6efff',
          300: '#75e5ff',
          400: '#2cd9ff',
          500: '#00ccff',
          600: '#009fd4',
          700: '#007fab',
          800: '#006b8d',
          900: '#065874',
          950: '#04384d'
        }
      }
    }
  }
}