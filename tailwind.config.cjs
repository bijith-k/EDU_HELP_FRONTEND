/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  important:'#root',
  theme: {
    extend: {
      colors:{
        'viking':'#7EB2DD',
        'dark-purple':'#081A51',
        'light-white':'rgba(255,255,255,0.17)',
      },
      // scrollbar: ['dark'],
      // scrollbar: {
      //   width: '5px',
      //   track: 'rgba(255, 255, 255, 0.1)',
      //   thumb: 'rgba(255, 255, 255, 0.5)',
      //   thumbHover: 'rgba(255, 255, 255, 0.7)',
      // },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    // plugin(function ({ addUtilities }) {
    //   addUtilities(
    //     {
    //       '.scrollbar-none::-webkit-scrollbar': {
    //         display: 'none',
    //       },
    //     },
    //     ['dark']
    //   );
    // }),
]
}
