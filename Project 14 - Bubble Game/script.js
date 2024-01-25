const bubbles = document.querySelector('#pbot');
const overview = document.querySelector('#overview');
const startbtn = document.querySelector('#startbtn');
const scoreview = document.querySelector('#scoreview');


var score = 0;
var timeinsec = 60;
let GenNum;

document.querySelector('#pbot').addEventListener("click", (detail) => {
    let hitNum = Number(detail.target.textContent);
    if (GenNum == hitNum) {
        scoreGen();
        bubblesGen();
        targetGen();
    }
})

function scoreGen() {
    const scorein = document.querySelector('#scorein');
    score += 10;
    scorein.textContent = score;
    timeinsec +=5;
}

function targetGen() {
    const targetin = document.querySelector('#targetin');
    GenNum = Math.floor(Math.random() * 10);
    targetin.textContent = GenNum;
}

function bubblesGen() {
    var cluster = " ";
    for (let i = 1; i <= 119; i++) {
        let val = Math.floor(Math.random() * 10);
        cluster += `<div id="bubble">${val}</div>`
    }
    bubbles.innerHTML = cluster;
}


function TimerGen() {
    timeinsec = 60;
    const timein = document.querySelector('#timein');
    let timing = setInterval(function () {
        if (timeinsec > 0) {
            timeinsec--;
            timein.textContent = timeinsec;
        } else {
            clearInterval(timing);
            function endOver(){
                overview.style.display = "flex";
                scoreview.style.display = "block";
                startbtn.innerHTML = "Play Again";
                scoreview.innerHTML = `<p>Your Score is: ${score}</p>`
            }
            endOver();
        }
    }, 1000)
}

function startGame(){
    overview.addEventListener("click", (detail) =>{
        overview.style.display = "none";

        TimerGen();
        bubblesGen();
        targetGen();
        console.log(detail.target);
    })
}


startGame();
