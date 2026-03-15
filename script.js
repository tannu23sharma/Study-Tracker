const startStopBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const totalStudyTime = document.querySelector("#total-study-time");

let totalTime = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

let timerInterval = null;
let timerStatus = "stopped";
let sessionSaved = false;

function formatDuration(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return h + " hours " + m + " minutes " + s + " seconds";
    if (m > 0) return m + " minutes " + s + " seconds";
    return s + " seconds";
}

function saveSession(sessionSeconds) {
    if (sessionSeconds <= 0) {
        return;
    }
    totalTime += sessionSeconds;
    totalStudyTime.textContent = "Total study time: " + formatDuration(totalTime);
}

function stopWatch(){
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Stop at 25:00
    if (minutes >= 25) {
        minutes = 25;
        seconds = 0;
        if (!sessionSaved) {
            const sessionSeconds = hours * 3600 + minutes * 60 + seconds;
            saveSession(sessionSeconds);
            sessionSaved = true;
        }
        window.clearInterval(timerInterval);
        timerStatus = "stopped";
        startStopBtn.innerText = "Start";
        totalStudyTime.textContent = "Total study time: " + formatDuration(totalTime) + " (25-minute focus complete!)";
    }

    // Formatting with leading zeros
    leadingSeconds = seconds < 10 ? "0" + seconds : seconds;
    leadingMinutes = minutes < 10 ? "0" + minutes : minutes;
    leadingHours = hours < 10 ? "0" + hours : hours;

    document.getElementById('timer').innerText = leadingHours + ":" + leadingMinutes + ":" + leadingSeconds;
}

startStopBtn.addEventListener('click',function(){

    if(timerStatus === "stopped"){
        timerInterval = window.setInterval(stopWatch, 1);
        document.getElementById('start-btn').innerHTML = `<i class="pause" id="pause-btn"></i>`;
        document.getElementById('start-btn').innerText = "Pause";
        timerStatus = "started";
    }else{
        window.clearInterval(timerInterval);
        document.getElementById('start-btn').innerHTML = `<i class="play" id="start-btn"></i>`;
        document.getElementById('start-btn').innerText = "Start";
        timerStatus = "stopped";
    }
});
resetBtn.addEventListener('click',function(){
    const sessionSeconds = hours * 3600 + minutes * 60 + seconds;
    if (sessionSeconds === 0) {
        if (totalTime === 0) {
            totalStudyTime.textContent = "No study time recorded yet.";
        } else {
            totalStudyTime.textContent = "Total study time: " + formatDuration(totalTime);
        }
    } else {
        if (!sessionSaved) {
            saveSession(sessionSeconds);
            sessionSaved = true;
        }
    }

    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    sessionSaved = false;
    document.getElementById('timer').innerHTML = "00:00:00";
        // Ensure start button resets to play state
    startStopBtn.innerHTML = `<i class="play" id="start-btn"></i>`;
    startStopBtn.innerText = "Start";
        // Reset timer status
    timerStatus = "stopped";
    
});
//to get local storage data
window.onload = function() {
    const savedTime = localStorage.getItem('totalStudyTime'); 
    if (savedTime) {
        totalStudyTime.textContent = savedTime;
    }
};
//to save data to local storage
window.onbeforeunload = function() {
    localStorage.setItem('totalStudyTime', totalStudyTime.textContent);
};
