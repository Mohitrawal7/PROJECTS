/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  safelist:['animate-[fade-in_2s_ease-in-out]','animate-fade-[fade-in-down_2s_ease-in-out]'],
  theme: {
    extend: {
      backgroundImage:{
        'main':"url('photos/main2.jpg')",
        'sky':"url('photos/sky.jpg')",
        'back':"url('photos/bracelet.jpeg')",
        'back1':"url('photos/watch.jpeg')",
        'main1':"url('photos/main1.jpg')",
        'main4':"url('photos/main4.jpg')"
      },
      borderWidth:{
        "big":"36px",
        "large":"48px"
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

