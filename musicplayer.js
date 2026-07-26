console.log("Supreme Player Started");


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


let audioElement = new Audio();

let currentIndex = 0;

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myprogressBar");

let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");

let volumeBar = document.getElementById("volumeBar");

let songInfo = document.querySelector(".songInfo");

let songItems = document.getElementsByClassName("songPlay");

let shuffleBtn = document.getElementById("shuffle");
let repeatBtn = document.getElementById("repeat");

let isShuffle = false;
let isRepeat = false;





function formatTime(seconds){

    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    if(sec < 10){
        sec = "0" + sec;
    }

    return `${min}:${sec}`;

}





function loadSong(index){

    currentIndex = index;

    audioElement.src = songs[index];

    songInfo.innerHTML =
    `<img src="playing.gif" width="42px">
    ${songNames[index]}`;

}





function playSong(){

    audioElement.play();

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

}





function pauseSong(){

    audioElement.pause();

    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");

}





masterPlay.addEventListener("click",()=>{


    if(audioElement.paused){

        if(!audioElement.src){
            loadSong(currentIndex);
        }

        playSong();

    }

    else{

        pauseSong();

    }


});




Array.from(songItems).forEach((element,index)=>{


    element.addEventListener("click",()=>{


        loadSong(index);

        playSong();


    });


});






document.getElementById("next").addEventListener("click",()=>{


    if(isShuffle){

        currentIndex = Math.floor(Math.random()*songs.length);

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






document.getElementById("previous").addEventListener("click",()=>{


    currentIndex--;


    if(currentIndex < 0){

        currentIndex = songs.length-1;

    }


    loadSong(currentIndex);

    playSong();


});






audioElement.addEventListener("timeupdate",()=>{


    if(audioElement.duration){


        let progress =
        (audioElement.currentTime /
        audioElement.duration) * 100;


        myProgressBar.value = progress;


        currentTime.innerText =
        formatTime(audioElement.currentTime);


        totalTime.innerText =
        formatTime(audioElement.duration);


    }


});




myProgressBar.addEventListener("input",()=>{


    audioElement.currentTime =
    (myProgressBar.value/100)
    * audioElement.duration;


});






volumeBar.addEventListener("input",()=>{


    audioElement.volume =
    volumeBar.value/100;


});



audioElement.addEventListener("ended",()=>{


    if(isRepeat){

        playSong();

    }

    else{

        document.getElementById("next").click();

    }


});





shuffleBtn.addEventListener("click",()=>{


    isShuffle=!isShuffle;


    if(isShuffle){

        shuffleBtn.style.color="lime";

    }

    else{

        shuffleBtn.style.color="white";

    }


});





repeatBtn.addEventListener("click",()=>{


    isRepeat=!isRepeat;


    if(isRepeat){

        repeatBtn.style.color="lime";

    }

    else{

        repeatBtn.style.color="white";

    }


});



audioElement.volume = 0.8;



loadSong(0);