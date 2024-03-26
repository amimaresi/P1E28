/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#dfe2eb',
        buttonDark: '#190482',
        buttonLight: '#4733E4',
        textDark: '#020B1F',
        textLight: '#EFF3FF',
      },
      fontFamily: {
        title: ['inter', "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans serif"],
      },
    },
  },
  plugins: [
  ],
}

