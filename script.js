const inputs_wrapper = document.querySelector(".numbers-wrapper");

const timer_div = document.querySelector(".timer");
const timer_start = document.querySelector(".timer__start");
const timer_title = document.querySelector(".timer__title");

const the_two_point = document.querySelectorAll(".the-two-point");

const timer_start_icon_path = document.querySelector(".timer__start > svg > path");
const timer_start_icon = document.querySelector(".timer__start > svg");

const timer_inputs = document.querySelectorAll(".time-inp");

const timer_hour = document.querySelector(".hour");
const timer_seconds = document.querySelector(".seconds");
const timer_minutes = document.querySelector(".minutes");

const select_theme = document.querySelector("#select-theme");

const alarm = new Audio("./sounds/alarm_sound_1.mp3");

const timer = {
    hour: 0,
    mins: 0,
    secs: 0,
    counting: false,
    start: toStartCountdown,
    stop: toStopCountdown
}

timer_hour.value = parseInt(timer.hour);
timer_seconds.value = parseInt(timer.secs);
timer_minutes.value = parseInt(timer.mins);

function toStartCountdown() {
        timer_hour.value = timer_hour.value == "" ? 0 : timer.hour;
        timer_seconds.value = timer_seconds.value == "" ? 0 : timer.secs;
        timer_minutes.value = timer_minutes.value == "" ? 0 : timer.mins;

        timer_hour.setAttribute("readonly", "true")
        timer_seconds.setAttribute("readonly", "true")
        timer_minutes.setAttribute("readonly", "true")
    
        timer.counting = true;

        alertIfCountdownStartOrPause()
                
        timer_hour.setAttribute("type", "text");
        timer_seconds.setAttribute("type", "text");
        timer_minutes.setAttribute("type", "text");
           
        timer_start_icon_path.setAttribute("d","M28.7 37V11h6.9v26Zm-16.3 0V11h6.95v26Z");
                
        interval = setInterval(function() {

            if(timer.secs > 0 || timer.mins > 0 || timer.hour > 0) {

                timer_hour.value = `${timer.hour}h`;
                timer_seconds.value = `${timer.secs}s`;
                timer_minutes.value = `${timer.mins}m`;    
                
                if(timer.secs > 0) {
                    timer.secs -= 1;
                }
            
                if(timer.mins > 0 && timer.secs == 0){
                    timer.mins -= 1;
                    timer.secs = 59;
                }
                     
                if(timer.hour > 0 && timer.mins == 0 && timer.secs == 0) {
                    timer.hour -= 1;
                    timer.mins = 59;
                    timer.secs = 59;
                }
                   
                if(timer.hour == 0 && timer.mins == 0 && timer.secs == 0) {
                    timer.stop();

                    alarm.play();
                }
            } else { return };
        }, 1000)
}

function toStopCountdown() {
    timer_start_icon_path.setAttribute("d","M17 36.1V11.7l19.15 12.2Z");
             
    timer_hour.value = timer.hour;
    timer_seconds.value = timer.secs;
    timer_minutes.value = timer.mins;       
            
    timer_hour.setAttribute("type", "number");
    timer_seconds.setAttribute("type", "number");
    timer_minutes.setAttribute("type", "number");
            
    timer_hour.removeAttribute("readonly")
    timer_seconds.removeAttribute("readonly")
    timer_minutes.removeAttribute("readonly");
    
    timer.counting = false;
    clearInterval(interval);        
}

function clickOnStartTimer() {
    if(timer.hour == 0 && timer.mins == 0 && timer.secs == 0) return

    if(timer.counting == true) {
        timer.stop();
    } else {
        timer.start();
    }
}

function clickOnSecondsInp() {
    if(timer_seconds.value == "") {
        timer.secs = 0;
    }

    if(timer_seconds.value <= 60 && timer_seconds.value >= 0) {
        timer.secs = timer_seconds.value;
    } else {
        timer.secs = 0;
        timer_seconds.value = timer.secs;
    }
}

function clickOnMinutesInp() {
    if(timer_minutes.value == "") {
        timer.mins = 0
    }

    if(timer_minutes.value < 60 && timer_minutes.value >= 0) {
        timer.mins = timer_minutes.value;
    } else {
        timer.mins = 0;
        timer_minutes.value = timer.mins;
    }
}

function clickOnHourInp() {
    if(timer_hour.value == "") {
        timer.hour = 0
    }

    if(timer_hour.value < 24 && timer_hour.value >= 0) {
        timer.hour = parseInt(timer_hour.value);
    } else {
        timer.hour = 0;
        timer_hour.value = timer.hour;
    }
}

function startCountdownPressingEnterKey(e) {
    if(e.key == "Enter") {
        timer_start.click();
    }
}

function alertIfCountdownStartOrPause() {
    const warn_div = document.querySelector(".warning-wrapper");
    warn_div.style.right = "1em"


    setTimeout(function() {
        warn_div.style.left = "100%"
    }, 2 * 1000);
}

function addRipleEffectOnStartCountdownButton(e) {
    const btn = e.currentTarget;

    const span = document.createElement("span");
    span.classList.add("ripple-span")

    btn.append(span);

    const spans = document.querySelectorAll(".ripple-span");

    setTimeout(()=> {
        span.remove()
        
    }, 500)

}

function popUpWhenMouseIsOnInp(event) {
    const x = event.pageX;
    const y = event.pageY;

    const div_info = document.querySelector(".div-info");
    const span = document.querySelector(".div-info span");

    const info = this.getAttribute("data-info");
    span.innerText = info;

    div_info.style.cssText =   `display: flex;
                                top: ${y - 50}px;
                                left: ${x}px`;
}

function disablePopUp() {
    const div_info = document.querySelector(".div-info");

    div_info.style.display = "none";
}

timer_start.addEventListener("click", clickOnStartTimer);
timer_start.addEventListener("click", addRipleEffectOnStartCountdownButton);
document.documentElement.addEventListener("keydown", startCountdownPressingEnterKey);

timer_seconds.addEventListener("keyup", clickOnSecondsInp);
timer_minutes.addEventListener("keyup", clickOnMinutesInp);
timer_hour.addEventListener("keyup", clickOnHourInp);

timer_inputs.forEach((e) => {
    e.addEventListener("mousemove", popUpWhenMouseIsOnInp);
})

inputs_wrapper.addEventListener("mouseout", disablePopUp)