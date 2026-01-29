const squares = document.querySelectorAll('.square');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('timeleft');
const startBtn = document.getElementById('start-btn');

let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;
let countDownTimerId = null;

function randomSquare() {

    squares.forEach(square => {
        square.classList.remove('bug');
        square.innerText = '';
    });


    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('bug');
    randomSquare.innerText = '🐛';

    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            scoreDisplay.textContent = result;
            hitPosition = null; 
            

            square.style.backgroundColor = 'var(--primary-color)';
            setTimeout(() => {
                square.style.backgroundColor = '';
            }, 100);
        }
    });
});

function moveBug() {
    timerId = setInterval(randomSquare, 700);
}

function countDown() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('SYSTEM CRASHED! Final Score: ' + result);
        
        startBtn.disabled = false;
        startBtn.innerText = "RESTART SYSTEM";
    }
}

startBtn.addEventListener('click', () => {
    result = 0;
    currentTime = 30;
    scoreDisplay.textContent = result;
    timeLeftDisplay.textContent = currentTime;
    
    startBtn.disabled = true;
    startBtn.innerText = "SMASHING...";

    moveBug();
    countDownTimerId = setInterval(countDown, 1000);
});