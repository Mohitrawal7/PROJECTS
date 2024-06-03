/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      backgroundImage:{
        'main':"url('photos/main2.jpg')",
        'sky':"url('photos/sky.jpg')"
      },
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

