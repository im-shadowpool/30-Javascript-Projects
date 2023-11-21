let [hours, minutes, seconds] = [0,0,0];
let timer = document.getElementById('timer');
const playbtn = document.getElementById('playbtn');
const listCard = document.getElementById('listCard');
let count = null;

function TimerFun(){
    seconds++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
        if(minutes == 60){
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10? "0" + hours: hours;
    let m = minutes < 10? "0" + minutes: minutes;
    let s = seconds < 10? "0" + seconds: seconds;

    timer.innerHTML = h + ":" + m + ":" + s;
}

const startTimer = () =>{
    if(count !== null){
        clearInterval(count)
    }
    if(playbtn.classList.contains('fa-paste')){
        let addlist =  `<li>timer.innerHTML</li>`;
        listCard.appendChild(addlist);
    }
    playbtn.classList.remove('fa-circle-play')
    playbtn.classList.add('fa-paste')
    count = setInterval(TimerFun, 1000);
}



function stoptimer(){
    clearInterval(count)
}

function resettimer(){
    clearTimeout(count);
   [hours, minutes, seconds] = [0,0,0];
    timer.innerHTML = "00:00:00";
    playbtn.classList.remove('fa-paste')
    playbtn.classList.add('fa-circle-play')
    
}


