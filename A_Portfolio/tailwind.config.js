/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      backgroundImage:{
        'main':"url('photos/main2.jpg')",
        'sky':"url('photos/sky.jpg')",
        'back':"url('photos/bracelet.jpeg')",
        'back1':"url('photos/watch.jpeg')"
      },
      borderWidth:{
        "big":"24px"
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

