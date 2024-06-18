const sideBar= document.querySelector("#sidebar");
const menu =document.querySelector("#menu");
const dropDown = document.querySelector("#dropdown");
const hasChildren = document.querySelector("#hasChildren"); 

sideBar.addEventListener("click",()=>{
    menu.classList.toggle("hidden")
    sideBar.classList.toggle("white")
});

hasChildren.addEventListener("click",()=>{
    dropDown.classList.toggle("hidden")
})

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
  