const sideBar= document.querySelector("#sidebar");
const menu =document.querySelector("#menu");
const dropDown = document.querySelector("#dropdown");
const hasChildren = document.querySelector("#hasChildren"); 
const dropDown1 = document.querySelector("#dropdown1");
const hasChildren1 = document.querySelector("#hasChildren1"); 



sideBar.addEventListener("click",()=>{
  menu.classList.toggle("hidden")
 
});

hasChildren.addEventListener("click",()=>{
    dropDown.classList.toggle("hidden")
});

hasChildren1.addEventListener("click",()=>{
  dropDown1.classList.toggle("hidden")
});

//swiper 
var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //swiper for products
  var swiper = new Swiper(".slide1-content", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper1-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper1-button-next",
      prevEl: ".swiper1-button-prev",
    },

  });

  
  //cart number
  const plus= document.querySelector("#plus");
  const minus= document.querySelector("#minus");
  var num= document.querySelector("#num");

  plus.addEventListener("click",()=>{
    num=num+1;
  });
var num=1;
  if(plus.clickable){
    num=num+1
  }


  //store price range

  const rangeInput = document.querySelectorAll(".range-input input"),
  progress = document.querySelector(".slider .proggress");

  rangeInput.forEach(input=>{
    input.addEventListener("input", ()=>{
      //getting 2 ranges values and parsing them to number
      let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

      let percent=(minVal/rangeInput[0].max)*100;
      console.log(percent);

        //progress.style.left = (minVal / rangeInput[0].max)*100 + "%";
        progress.style.right = 100 - (maxVal / rangeInput[1].max)*100 + "%";
      });
  })
  