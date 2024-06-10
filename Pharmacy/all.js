const sideBar= document.querySelector("#sidebar");
const menu =document.querySelector("#menu");


sideBar.addEventListener("click",()=>{
    menu.classList.toggle("hidden")
    sideBar.classList.toggle("white")
})