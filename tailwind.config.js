import plugin from 'tailwindcss/plugin'

export default {
  content: [
    './src/**/*.{pug,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        bgblur: 'rgba(255, 255, 255, 0.10)',
        dark: '#0B1226',
        white: '#fff',
        light: '#f2f2f2',
        accent: '#0070B8',
        gray: {
          700: '#747884',
          500: '#E4E4E4'
        }
      },
      fontFamily: {
        'display': ['TT Firs Neue', 'serif'],
        'fm' : ['Foundry Monoline OT3', "serif"]
      },
      borderRadius: {
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        'full': '9999px'
      },

      sizing: {
        's': '0.875rem',
        'm': '1rem', // 16px
        'md': '1.125rem', // 18px
        'lg': '1.5rem', // 24px
      },
      size: {
        'lg': '1.5rem',
      }
      // leading: {
      //   '1.4rem': '22.4px'
      // }
    },

    screens: {
      desktop: { min: '1201px' },
      devices: { max: '1200px' },
      tablet: { max: '1200px', min: '768px' },
      mobile: { max: '767px' },
      xxl: { max: '1920px' },
      ll: { max: '1440px' },
      d: { max: '1201px' },
      t: { max: '1024px' },
      lg: { max: '992px' },
      m: { max: '768px' },
      s: { max: '576px' },
      xs: { max: '375px' }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ theme, addUtilities }) {
      const screens = theme('screens')

      const newUtilities = {
        '.desktop': {
          [`@media (max-width: ${screens.tablet.max})`]: {
            display: 'none !important'
          }
        },
        '.mobile': {
          [`@media (min-width: ${screens.tablet.min})`]: {
            display: 'none !important'
          }
        },
        '.tablet': {
          [`@media (min-width: ${screens.desktop.min})`]: {
            display: 'none !important'
          },
          [`@media (max-width: ${screens.mobile.max})`]: {
            display: 'none !important'
          }
        },
        '.devices': {
          [`@media (min-width: ${screens.desktop.min})`]: {
            display: 'none !important'
          }
        },
        '.desktop-tablet': {
          [`@media (max-width: ${screens.mobile.max})`]: {
            display: 'none !important'
          }
        }
      }

      addUtilities(newUtilities, ['responsive'])
    })
  ]
}