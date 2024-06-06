/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    safelist:['animate-[fade-in_2s_ease-in-out]','animate-fade-[fade-in-down_2s_ease-in-out]'],
    extend: {
      backgroundImage:{
        'main':"url('photos/main2.jpg')",
        'sky':"url('photos/sky.jpg')",
        'back':"url('photos/bracelet.jpeg')",
        'back1':"url('photos/watch.jpeg')"
      },
      borderWidth:{
        "big":"48px"
      },
      screens:{
        "sm":"480px"
      },
      spacing:{
        "cent":"25rem",
        "big":"62rem",
        "large":"89rem"
      },
    },
  },
  plugins: [],
}

