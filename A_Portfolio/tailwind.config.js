/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      screens:{
        "sm":"480px"
      },
      spacing:{
        "big":"62rem",
        "large":"89rem"
      },
      
    },
  },
  plugins: [],
}
