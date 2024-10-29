import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/**/*.{pug,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.33, 1, 0.68, 1)'
      },
      transitionDuration: {
        DEFAULT: '0.5s'
      },
      colors: {
        dark: '#0c0c0c',
        light: '#f2f2f2'
      },
      screens: {
        desktop: { max: '1201px' },
        mobile: { max: '768px' }
      }
    }
  },
  plugins: [
    plugin(function ({ theme, addUtilities }) {
      const screens = theme('screens')

      const newUtilities = {
        '.desktop': {
          [`@media (max-width: ${screens.desktop.max})`]: {
            display: 'none !important'
          }
        },
        '.mobile': {
          [`@media (min-width: ${screens.mobile.max})`]: {
            display: 'none !important'
          }
        },
        '.tablet': {
          [`@media (min-width: ${screens.desktop.max})`]: {
            display: 'none !important'
          },
          [`@media (max-width: ${screens.mobile.max})`]: {
            display: 'none !important'
          }
        },
        '.devices': {
          [`@media (min-width: ${screens.desktop.max})`]: {
            display: 'none !important'
          }
        }
      }

      addUtilities(newUtilities, ['responsive'])
    })
  ]
}
