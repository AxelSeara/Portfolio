/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.svg-stroke-hover': {
          '&:hover svg path': {
            stroke: 'white',
          },
        },
      });
    },
  ],
}
