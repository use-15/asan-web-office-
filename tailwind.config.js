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
          'blue-hover': '#0067b8',
          'blue-light': '#deecf9',
          'neutral-10': '#faf9f8',
          'neutral-20': '#f3f2f1',
          'neutral-30': '#edebe9',
          'neutral-40': '#e1dfdd',
          'neutral-100': '#a19f9d',
          'neutral-160': '#323130',
        },
        stitch: {
          primary: '#0078d4',
          surface: '#ffffff',
          background: '#faf9f8',
          border: '#edebe9',
          text: '#323130',
          'text-secondary': '#605e5c',
        }
      },
      boxShadow: {
        'stitch-sm': '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
        'stitch-md': '0 3.2px 7.2px 0 rgba(0,0,0,0.132), 0 0.6px 1.8px 0 rgba(0,0,0,0.108)',
        'stitch-lg': '0 6.4px 14.4px 0 rgba(0,0,0,0.132), 0 1.2px 3.6px 0 rgba(0,0,0,0.108)',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
