console.log("welcome");

//Initialize the variable
let songIndex=1;

let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar');
let back = document.getElementById('back');
let forward = document.getElementById('forward');
let songs = [
    {songName : "Until i found u", filePath:"song/6.mp3"},
    {songName : "Iraadey", filePath:"song/1.mp3"},
    {songName : "Gulaabi sadi", filePath:"song/2.mp3"},
    {songName : "Yours Eyes", filePath:"song/3.mp3.mp3"},
    {songName : "Keejo Kesari", filePath:"song/4.mp3.mp3"},
    {songName : "Beautifu things", filePath:"song/5.mp3"}
]
// console.log(songs[0].filePath);
let audioElement = new Audio(songs[songIndex].filePath);



//Handle play/pause click
masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        // masterPlay.classList.remove('fa-solid fa-play-circle');
        // masterPlay.classList.add('fa-solid fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        // masterPlay.classList.remove('fa-solid fa-pause-circle');
        // masterPlay.classList.add('fa-solid fa-play-circle'); 
        gif.style.opacity=0;
    }
});

back.addEventListener('click',()=>{
    songIndex=songIndex-1;
    console.log(songIndex);
})

forward.addEventListener('click',()=>{
    songIndex=songIndex+1;
    console.log(songIndex);
})


//listen to event
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
//console.log(progress);
myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value*audioElement.duration/100;
});













const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('far')).forEach((e)=>{
        // e.classlist.remove('fa-solid fa-pause-circle');
        // e.classlist.add('fa-solid fa-play-circle');
        console.log("app");
   });
};

Array.from(document.getElementsByClassName('far')).forEach((e)=>{
    e.addEventListener('click',(e)=>{ 
        makeAllPlays();
        // e.target.classList.remove('fa-solid fa-play-circle');
        // e.target.classList.add('fa-solid fa-pause-circle');
        audioElement.src='song/3.mp3';
        audioElement.currentTime=0;
        audioElement.play();
    });
}); 

