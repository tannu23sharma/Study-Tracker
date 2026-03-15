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

function stopWatch(){
    seconds++

    if(seconds >= 60){
        seconds = 0;
        minutes ++;

        if(minutes >= 60){
            minutes = 0;
            hours++;
        }
    }
    // Formatting with leading zeros
    leadingSeconds = seconds < 10 ? "0" + seconds : seconds;
    leadingMinutes = minutes < 10 ? "0" + minutes : minutes;
    leadingHours = hours < 10 ? "0" + hours : hours;

    let displayTimer = document.getElementById('timer').innerText = leadingHours + ":" + leadingMinutes + ":" + leadingSeconds;
}

startStopBtn.addEventListener('click',function(){

    if(timerStatus === "stopped"){
        timerInterval = window.setInterval(stopWatch, 1000);
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
    if(leadingHours == 0 && leadingMinutes == 0 && leadingSeconds == 0){
        totalStudyTime.textContent = "No study time recorded yet.";
    }else if(leadingHours == 0 && leadingMinutes == 0){
        totalTime += seconds;
        totalStudyTime.textContent = totalTime + " seconds";
    }else if(leadingHours == 0){
        totalStudyTime.textContent = leadingMinutes + " minutes " + leadingSeconds + " seconds";
    }else{
         totalStudyTime.textContent = leadingHours + " hours " + leadingMinutes + " minutes " + leadingSeconds + " seconds";
    }  

    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('timer').innerHTML = "00:00:00";
        // Ensure start button resets to play state
    startStopBtn.innerHTML = `<i class="play" id="start-btn"></i>`;
    startStopBtn.innerText = "Start";
        // Reset timer status
    timerStatus = "stopped";
    
});