/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        office: {
          word: '#2b579a',
          sheet: '#217346',
          slide: '#d24726',
          pdf: '#b30b00',
          blue: '#005a9e',
        }
      }
    },
  },
  plugins: [],
}
