const hidden = document.querySelector("#hidden");
const main = document.querySelector("#main");
const comm = document.querySelector("#comm");
const likedd = document.querySelector("#likedd");
const dislike = document.querySelector("#dislike");
const comments = document.querySelector("#comments");
const share = document.querySelector("#share");

let arr = [likedd,dislike,comments,share];
let i =0;
//arr[i].addEventListener("click", () => {
 //   comm.classList.toggle("hidden");
   // i+=1;
//});

likedd.addEventListener('click',(event) =>{
    const workContainer = event.target.closest('#comm');
    if (workContainer !== null) {
      console.log(workContainer);
    }
});

hidden.addEventListener("click", () =>{
    main.classList.toggle("hidden");
    console.log("gon")
});

//like.addEventListener("click",() =>{
 //   comment.classList.toggle("hidden");
   //  console.log("fon")
// })

// likedd.addEventListener("click", () =>{
//     comm.classList.toggle("hidden");
//    console.log("gon");
 //  });

