/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      ubuntu: ['"Ubuntu", sans-serif'],
    },
    extend: {
      colors: {
        'primary' : '#9e2126',
        'secondary' : '#851c20'
      },
    },
  },
  plugins: [],
}