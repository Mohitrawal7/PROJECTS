console.log("welcome");

// Initialize
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let back = document.getElementById('back');
let forward = document.getElementById('forward');
let gif = document.getElementById('gif');

let songs = [
    { songName: "Until I Found You", filePath: "song/6.mp3" },
    { songName: "Iraadey", filePath: "song/1.mp3" },
    { songName: "Gulaabi Sadi", filePath: "song/2.mp3" },
    { songName: "Your Eyes", filePath: "song/3.mp3" },
    { songName: "Keejo Kesari", filePath: "song/4.mp3" },
    { songName: "Beautiful Things", filePath: "song/5.mp3" }
];
document.getElementById("currentSongName").innerText = songs[songIndex].songName;
let audioElement = new Audio(songs[songIndex].filePath);


function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;

    // UPDATE SONG NAME IN MASTER PLAY SECTION
    document.getElementById("currentSongName").innerText =
        songs[songIndex].songName;
}

// Play/Pause main button
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seekbar change
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play icons
function makeAllPlays() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
        el.classList.remove("fa-pause-circle");
        el.classList.add("fa-play-circle");
    });
}

// Play from song list
Array.from(document.getElementsByClassName("songItemPlay")).forEach((el, index) => {
    el.addEventListener("click", () => {
        makeAllPlays();
        songIndex = index;

        el.classList.remove("fa-play-circle");
        el.classList.add("fa-pause-circle");

        playSong();
    });
});

// Back button
back.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;

   playSong();
});

// Forward button
forward.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;

    playSong();
});
