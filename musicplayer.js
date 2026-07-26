console.log("Supreme Player Started");


// Songs

let songs = [
    "1.mp3",
    "2.mp3",
    "3.mp3",
    "4.mp3",
    "5.mp3",
    "6.mp3",
    "7.mp3",
    "8.mp3",
    "9.mp3",
    "10.mp3"
];


// Song Names

let songNames = [
    "BRUXO FANTASMA ULTRA SLOWED",
    "AMOR NA PRAIA-SLOWED",
    "FUNK ABNORMAL-SLOWED",
    "DON'T STOP-SLOWED",
    "MONTAGE ELDER-SUPER SLOWED",
    "NO BATIDO-SLOWED",
    "FUNK SIGILO-ULTRA SLOWED",
    "REVENGE-SLOWED",
    "ABNORMAL-ULTRA SLOWED",
    "VEM PERE REKA-SLOWED"
];


// Covers

let covers = [
    "image.png",
    "Screenshot 2026-07-26 211212.png",
    "Screenshot 2026-07-26 211417.png",
    "Screenshot 2026-07-26 211352.png",
    "Screenshot 2026-07-26 211611.png",
    "Screenshot 2026-07-26 211440.png",
    "Screenshot 2026-07-26 211541.png",
    "Screenshot 2026-07-26 211247.png",
    "Screenshot 2026-07-26 211633.png",
    "Screenshot 2026-07-26 211744.png"
];



// Audio

let audioElement = new Audio();

let currentIndex = 0;



// Elements

let masterPlay = document.getElementById("masterPlay");

let next = document.getElementById("next");

let previous = document.getElementById("previous");

let progressBar = document.getElementById("myprogressBar");

let currentTime = document.getElementById("currentTime");

let totalTime = document.getElementById("totalTime");

let volumeBar = document.getElementById("volumeBar");

let masterSongName = document.getElementById("masterSongName");

let masterCover = document.getElementById("masterCover");

let songItems = document.getElementsByClassName("songPlay");

let shuffleBtn = document.getElementById("shuffle");

let repeatBtn = document.getElementById("repeat");



// Buttons

let isShuffle = false;

let isRepeat = false;




// Time format

function formatTime(seconds){

    let min = Math.floor(seconds / 60);

    let sec = Math.floor(seconds % 60);


    if(sec < 10){
        sec = "0" + sec;
    }


    return `${min}:${sec}`;

}




// Load Song

function loadSong(index){


    currentIndex = index;


    audioElement.src = songs[index];


    if(masterSongName){

        masterSongName.innerText = songNames[index];

    }


    if(masterCover){

        masterCover.src = covers[index];

    }


}






// Play Song

function playSong(){


    audioElement.play();


    masterPlay.classList.remove(
        "fa-circle-play"
    );


    masterPlay.classList.add(
        "fa-circle-pause"
    );


}





// Pause Song

function pauseSong(){


    audioElement.pause();


    masterPlay.classList.remove(
        "fa-circle-pause"
    );


    masterPlay.classList.add(
        "fa-circle-play"
    );


}





// Main Play Button

masterPlay.addEventListener("click",()=>{


    if(audioElement.paused){


        if(audioElement.src === ""){

            loadSong(currentIndex);

        }


        playSong();


    }

    else{


        pauseSong();


    }


});







// Song List Play Buttons

Array.from(songItems).forEach((element,index)=>{


    element.addEventListener("click",()=>{


        loadSong(index);


        playSong();


    });


});








// Next Button

next.addEventListener("click",()=>{


    if(isShuffle){


        currentIndex =
        Math.floor(Math.random()*songs.length);


    }

    else{


        currentIndex++;


        if(currentIndex >= songs.length){

            currentIndex = 0;

        }


    }


    loadSong(currentIndex);


    playSong();


});








// Previous Button

previous.addEventListener("click",()=>{


    currentIndex--;


    if(currentIndex < 0){

        currentIndex = songs.length-1;

    }


    loadSong(currentIndex);


    playSong();


});








// Progress Bar Update


audioElement.addEventListener(
"timeupdate",
()=>{


    if(audioElement.duration){


        let progress =
        (audioElement.currentTime /
        audioElement.duration)*100;


        progressBar.value = progress;



        currentTime.innerText =
        formatTime(audioElement.currentTime);



        totalTime.innerText =
        formatTime(audioElement.duration);



    }


});








// Change Song Time

progressBar.addEventListener(
"input",
()=>{


    audioElement.currentTime =
    (progressBar.value/100)
    *
    audioElement.duration;


});








// Volume


volumeBar.addEventListener(
"input",
()=>{


    audioElement.volume =
    volumeBar.value/100;


});







// Auto Next


audioElement.addEventListener(
"ended",
()=>{


    if(isRepeat){


        audioElement.currentTime = 0;


        playSong();


    }

    else{


        next.click();


    }


});








// Shuffle Button


shuffleBtn.addEventListener(
"click",
()=>{


    isShuffle = !isShuffle;


    shuffleBtn.style.color =
    isShuffle ? "lime" : "white";


});








// Repeat Button


repeatBtn.addEventListener(
"click",
()=>{


    isRepeat = !isRepeat;


    repeatBtn.style.color =
    isRepeat ? "lime" : "white";


});








// Keyboard Control


document.addEventListener(
"keydown",
(e)=>{


    if(e.code==="Space"){


        e.preventDefault();


        masterPlay.click();


    }


});








// Default Settings


audioElement.volume = 0.8;


loadSong(0);
