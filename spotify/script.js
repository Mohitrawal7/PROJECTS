console.log("welcome");

//Initialize the variable
let songIndex=0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar');
let songs = [
    {songName : "Iraadey", filePath:"song/1.mp3"},
    {songName : "Gulaabi sadi", filePath:"song/2.mp3"},
    {songName : "Yours Eyes", filePath:"song/3.mp3"},
    {songName : "Keejo Kesari", filePath:"song/4.mp3"},
    {songName : "Beautifu things", filePath:"song/5.mp3"},
    {songName : "Until i found u", filePath:"song/6.mp3"},
    {songName : "Iraadey", filePath:"song/1.mp3"}
]

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-solid fa-play-circle');
        masterPlay.classList.add('fa-solid fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-solid fa-pause-circle');
        masterPlay.classList.add('fa-solid fa-play-circle'); 
        gif.style.opacity=0;
    }
});

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
    Array.from(document.getElementsByClassName('far')).forEach((element)=>{
        element.classlist.remove('fa-solid fa-pause-circle');
        element.classlist.add('fa-solid fa-play-circle');
   });
};

Array.from(document.getElementsByClassName('far')).forEach((element)=>{
    element.addEventListener('click',(e)=>{ 
        makeAllPlays();
        e.target.classList.remove('fa-solid fa-play-circle');
        e.target.classList.add('fa-solid fa-pause-circle');
        audioElement.src='song/3.mp3';
        audioElement.currentTime=0;
        audioElement.play();
    });
}); 