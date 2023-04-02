/** @type {import('tailwindcss').Config} */


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
      }
    },
  },
  plugins: [],
}
