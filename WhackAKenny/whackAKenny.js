const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score span');
const kennys = document.querySelectorAll('.kenny');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
var time = false;
var score = 0;
var lastHole;
var popTime;
var gameTime;

function timer(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popUp() {
    const timeLeft = timer(1000, 1500);
    const hole = randomHole(holes);

    hole.classList.remove('none');
    popTime = setTimeout(() => {
        hole.classList.add('none');
        if(!time) {
            popUp ();
        }
    }, timeLeft);
}

function start() {
    score = 0;
    scoreBoard.innerText = score;
    document.querySelector('.score').classList.remove('none');
    document.querySelector('table').classList.remove('none');
    document.querySelector('#start').classList.add('none');
    document.querySelector('#replay').classList.add('none');
    win.classList.add('none');
    lose.classList.add('none');
    popUp();
    gameTime = setTimeout(() => time = true, 20000);
}

function whack(e) {
    if(!e.isTrusted) return; {
        score++;
        this.classList.add('none');
        scoreBoard.innerText = score;
        verif();
    }
}

function verif() {
    if(score == 10) {
        win.classList.remove('none');
        document.querySelector('table').classList.add('none');
        document.querySelector('#replay').classList.remove('none');
        clearTimeout(popTime);
        clearTimeout(gameTime);
    }
    if(score == 0) {
        lose.classList.remove('none');
        document.querySelector('table').classList.add('none');
        document.querySelector('#replay').classList.remove('none');
        clearTimeout(popTime);
        clearTimeout(gameTime);
    }
}

document.querySelector('#replay').addEventListener('click', () => {
    var time = false;
    var lastHole;
    start();
});

document.querySelector('#start').addEventListener('click', () => {
    start();
});

kennys.forEach(kenny => kenny.addEventListener('click', whack))
