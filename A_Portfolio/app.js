const sideBar= document.querySelector("#sidebar");
const menu =document.querySelector("#menu");
const extra1 = document.querySelector("#extra1");
const extra2 = document.querySelector("#extra2");
const extra3 = document.querySelector("#extra3");
const extra4 = document.querySelector("#extra4");
const stuff1= document.querySelector("#stuff1");
const stuff2= document.querySelector("#stuff2");
const stuff3= document.querySelector("#stuff3");
const stuff4= document.querySelector("#stuff4");

sideBar.addEventListener("click",()=>{
    menu.classList.toggle("hidden")
    sideBar.classList.toggle("bg-white")
})

stuff1.addEventListener("click",()=>{
    extra1.classList.toggle("hidden");
    stuff1.classList.toggle("bg-blue");
})
stuff2.addEventListener("click",()=>{
    extra2.classList.toggle("hidden");
    stuff2.classList.toggle("bg-blue");
})
stuff3.addEventListener("click",()=>{
    extra3.classList.toggle("hidden");
    stuff3.classList.toggle("bg-blue");
})
stuff4.addEventListener("click",()=>{
    extra4.classList.toggle("hidden");
    stuff4.classList.toggle("bg-blue");
})


/*hLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        menu.classList.toggle("hidden");
        hamburger.classList.toggle("bg-white");
    })
})*/