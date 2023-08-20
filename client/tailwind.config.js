/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    fontFamily: {
      'serif': ['Georgia'],
      'sansSerif': ['Helvetica'],
    },
    extend: {
      colors: {
        'darkBlue': '#03254C',
        'lightBlue': '#1167B1',
        'lightestBlue': '#D0EFFF',
      }
    },
  },
  plugins: [],
}

