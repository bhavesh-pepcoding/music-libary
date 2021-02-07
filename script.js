
let playingSong = document.getElementById("playing-song");
let playButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");
let endTime = document.getElementById("end-time");
let currentTime = document.getElementById("current-time");
let currentSeconds = 0;
let currentMinutes = 0;
let endMinutes = 0;
let endSeconds = 0;
let timeSlider = document.getElementById("time-slider");
let volumeSlider = document.getElementById("volume-slider");

let audioInterval;

function calculateCurrentTime() {
    currentMinutes = Math.floor(playingSong.currentTime / 60);
    currentSeconds = Math.ceil(playingSong.currentTime - (currentMinutes * 60));
    if(currentSeconds === endSeconds && currentMinutes === endMinutes) {
        currentSeconds = 0;
        currentMinutes = 0;
        clearInterval(audioInterval);
    }
    let minutes = (currentMinutes / 10) < 1 ? ("0" + currentMinutes) : currentMinutes;
    let seconds = (currentSeconds / 10) < 1 ? ("0" + currentSeconds) : currentSeconds;
    let finalTIme = minutes + ":" + seconds;
    currentTime.innerText = finalTIme;
}

timeSlider.addEventListener("change", () => {
    playingSong.currentTime = timeSlider.value;
    calculateCurrentTime();
});

volumeSlider.addEventListener("change", () => {
    playingSong.volume = (volumeSlider.value/100);
});

playingSong.addEventListener("canplaythrough", () => {
    calculateEndTime();
    timeSlider.setAttribute("max", Math.ceil(playingSong.duration));
})

function calculateEndTime() {
    endMinutes = Math.floor(playingSong.duration / 60);
    endSeconds = Math.ceil(playingSong.duration - (endMinutes * 60));
    let minutes = (endMinutes / 10) < 1 ? ("0" + endMinutes) : endMinutes;
    let seconds = (endSeconds / 10) < 1 ? ("0" + endSeconds) : endSeconds;
    let finalTIme = minutes + ":" + seconds;
    endTime.innerText = finalTIme;
}

function playSong() {
    playingSong.play();
    playButton.classList.add("not-active");
    pauseButton.classList.remove("not-active");
    audioInterval = setInterval(() => {
        timeSlider.value = playingSong.currentTime;
        calculateCurrentTime();
    }, 1000);
}

function pauseSong() {
    playingSong.pause();
    playButton.classList.remove("not-active");
    pauseButton.classList.add("not-active");
    clearInterval(audioInterval);
}