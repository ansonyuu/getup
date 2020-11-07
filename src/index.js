
let currentWorkTimer = 1;
let currentBreakTimer = 1;
let currentlyWorking = true;
let currentAudio = "audio/honk.mp3";
let audioLastPlayed = new Date();
let audioThrottle = 500;


function startVideoStream() {
    if (!navigator.mediaDevices.getUserMedia)
        return;
    navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "user" } })
        .then(function (stream) {
        const video = document.querySelector("#webcam");
        video.srcObject = stream;
        video.onloadedmetadata = e => {
            video.play();
        };
        video.onloadeddata = e => {
            startTesting(video);
        };
    })
        .catch(function (err) {
        alert("An error has occurred loading your webcam feed. Try again, or maybe in a different browser?");
    });
}

function playAudio() {
    const now = new Date();
    const differenceInMS = Math.floor(now.getTime() - audioLastPlayed.getTime());
    if (differenceInMS < audioThrottle)
        return;
    audioLastPlayed = now;
    const audio = new Audio(currentAudio);
    audio.play();
}

let testingTimeout;
let timerTimeout;
let dateOfLastTouch = new Date();

// TODO: I think there should be a toggle for showing system alerts?
let alertIsVisible = false;

function startTesting(video, interval = 100) {

    const title = document.getElementById("header");
    const time = document.getElementById("time");

    const loop = async () => {
        const isTouching = await checkFaceTouching(video);
        const now = new Date();
        if (isTouching) {
            if (document.getElementById("play-sound").checked) {
                playAudio();
            }
            document.body.classList.add("touching");
            title.innerText = "⚠️ Go back to walking, you're not there yet ⚠️";
            dateOfLastTouch = now;
            // alert() calls are "blocking" within the current thread
            // This is a very sloppy semaphore lock to try to stop us from piling up alerts.
            const showAlerts = document.getElementById("show-alert").checked;
            if (showAlerts && !alertIsVisible) {
                alertIsVisible = true;
                alert("Go take your break!");
                alertIsVisible = false;
            }
        }
        else {
            document.body.classList.remove("touching");
        }
        
        const differenceInSeconds = Math.floor((now.getTime() - dateOfLastTouch.getTime()) / 1000);
        
        testingTimeout = setTimeout(loop, interval);

    };
    loop();
}
function stopTesting() {
    clearTimeout(testingTimeout);
    clearTimeout(timerTimeout);
}


function AddMinutesToDate(date, minutes) {
    return new Date(date + (minutes * 60000));
}

function SetCountdown(timeInput){
    var now = new Date().getTime();
    var next = AddMinutesToDate(now, timeInput)

    // Update the count down every 1 second
    var x = setInterval(function() {
    
    // Find the distance between now and the count down date
    var distance = next - (new Date().getTime());
        
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
    document.getElementById("countdown-display").innerHTML = minutes + "m " + seconds + "s ";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-display").innerHTML = "EXPIRED";
    }
    }, 1000);
}


async function checkFaceTouching(video) {

}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("start").addEventListener("click", () => {
        document.getElementById("start").hidden = true;
        startVideoStream();
    });
    if (window.safari) {
        const safari = document.getElementById("safari-warning");
        const safariClose = document.getElementById("close-safari");
        safari.hidden = false;
        safariClose.addEventListener("click", () => {
            safari.hidden = true;
        });
    };

    document.querySelectorAll("button.work-minutes").forEach(el => {
        el.addEventListener("click", e => {
            document.getElementById("work-section").hidden = true;
            document.getElementById("break-section").show = true;
            const value = e.target.value;
            console.log(value);
            currentWorkTimer = value;
            SetCountdown(currentWorkTimer);
        });

    });

    document.querySelectorAll("button.break-minutes").forEach(el => {
        el.addEventListener("click", e => {
            document.getElementById("break-section").hidden = true;
            document.getElementById("work-section").show = true;
            const value = e.target.value;
            console.log(value);
            currentBreakTimer = value;
            SetCountdown(currentBreakTimer);
        });

    });

    document.querySelectorAll("input.sfx").forEach(el => {
        el.addEventListener("change", e => {
            const value = e.target.value;
            console.log("Setting value", value);
            currentAudio = value;
            playAudio();
        });
    });
});