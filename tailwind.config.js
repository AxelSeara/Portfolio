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
        'no-blur': '5px 5px 0 0 var(--retro-border)',
      },
      colors: {
        primary: 'var(--retro-surface-strong)',
        secondary: 'var(--retro-surface-alt)',
        tertiary: 'var(--retro-bg)',
        quaternary: 'var(--retro-surface)',
        accent: 'var(--retro-accent)',
      },
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'],
        lora: ['Lora', 'serif'],
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
