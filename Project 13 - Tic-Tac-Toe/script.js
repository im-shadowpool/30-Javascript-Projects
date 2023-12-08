const endTitle = document.querySelector(".endTitle");
const card1 = document.querySelector('.card');
const card2 = document.querySelector('.card2');
const btn = document.querySelectorAll(".btn")
let toss = true;
let count = 0;
const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]
// const arr = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]

btn.forEach((button) => {
    button.addEventListener('click', () => {
        if (toss) {
            button.innerHTML = 'O';
            toss = false;
        } else {
            button.innerHTML = 'X';
            toss = true;
        }
        button.disabled = true;
        checkAns();
    })
})

const Disabledbtns = () => {
    for (let bt of btn) {
        bt.disabled = true;
    }
}

const newGame = () => {
    toss = true;
    card1.style.display = 'block';
    card2.style.display = 'none';
    for (let bt of btn) {
        bt.disabled = false;
        bt.innerHTML = "";
    }
}

const checkAns = () => {
    for (let ar of arr) {
        // console.log(ar[0]);
        // console.log(ar[1]);
        // console.log(ar[2]);
        // console.log(btn[ar[0]]);
        // console.log(btn[ar[1]]);
        // console.log(btn[ar[2]]);
        let positionVal1 = btn[ar[0]].innerHTML;
        let positionVal2 = btn[ar[1]].innerHTML;
        let positionVal3 = btn[ar[2]].innerHTML;
        if (positionVal1 != "" && positionVal2 != "" && positionVal3 != "") {
            if (positionVal1 === positionVal2 && positionVal2 === positionVal3) {
                // console.log('winner');
                endTitle.innerHTML = `Winner is <span>${positionVal1}</span>`
                card1.style.display = 'none';
                card2.style.display = 'block';
                Disabledbtns();
                break;
            }
        }



        // console.log(arr[ar]);
        //  console.log(arr);

    }
    console.log(count);
    count++;
    if (count === 9) {
        endTitle.innerHTML = `Draw! Play Again.`
        card1.style.display = 'none';
        card2.style.display = 'block';
    }
}

