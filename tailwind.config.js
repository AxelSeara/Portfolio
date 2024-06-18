const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '2': 'repeat(2, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
      },
      gap: {
        '4': '1rem',
        '8': '2rem',
      },
      boxShadow: {
        'no-blur': '5px 5px 0 0 #243b40',
      },
      colors: {
        primary: '#ff8e78',
        secondary: '#ffba6b',
        tertiary: '#75bebe',
        quaternary: '#e1b1a9',
        accent: '#243b40',
      },
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'],
      },
      // Adding text shadow extensions
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    // Existing plugin for custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.svg-stroke-hover': {
          '&:hover svg path': {
            stroke: 'white',
          },
        },
      });
    },
    // Adding plugin for text shadow
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}