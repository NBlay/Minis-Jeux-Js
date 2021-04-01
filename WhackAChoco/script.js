var numBlocks = 16;
var sqrt = 100/Math.sqrt(numBlocks);
var board = document.querySelector('#boardgame');
var scoreboard = document.querySelector('#scoreboard');
var timeLeft = document.querySelector('#timer');
var sec = 21;
var images = ["url('img/choco1.jpg')", "url('img/choco2.jpg')", "url('img/choco3.jpg')"];
var countdown;
var timer;
var interval = 3000;
var rand;
var block;
var score;

document.querySelector('#startGame').addEventListener('click', () => {
    score = 0;
    sec = 21;
    interval = 3000;
    document.querySelector('#boardgame').classList.remove('none');
    document.querySelector('#display').classList.add('none');
    clearInterval(timer);
    clearInterval(countdown);
    board.innerHTML = '';
    for (var i = 1; i <= numBlocks; i++) {
        var element = `<div class="block" data-id="${i}"></div>`;
        board.innerHTML += element;
    }
    document.querySelectorAll('.block').forEach((block) => {
        block.style.width = `${sqrt}%`;
        block.style.height = `${sqrt}%`;
    })
    timer = setInterval(nextTurn, interval);
    remainingTime();
})

document.querySelector('#boardgame').addEventListener('click', (el) => {
    el = el.target;
    if (el.dataset.id == rand) {
        score++;
        interval -= 250;
        clearInterval(timer);
        timer = setInterval(nextTurn, interval);
        scoreboard.innerText = `Score : ${score} pt`;
        displayChoco();
        verifScore();
    } else {
        score--;
        if (score <= 0) {
            verifScore();
        }
        scoreboard.innerText = `Score : ${score} pt`;
    }
})

function remainingTime() {
    countdown = setInterval(function() {
        timeLeft.innerText = `Timer : ${sec} s`;
        sec--;
        timeLeft.innerText = `Timer : ${sec} s`;
        if (sec == 0) {
            // debugger;
            clearInterval(countdown);
            verifScore();
            document.querySelector('#boardgame').classList.add('none');
            document.querySelector('#display').classList.remove('none');
            var element = `<div class="result">You lose ! You hit the time limit !</div>`;
            document.querySelector('#display').innerHTML += element;
        }
    }, 1000);
}

function nextTurn() {
    if (score > 0) {
        score--;
        scoreboard.innerText = `Score : ${score} pt`;
    }
    displayChoco();
}

function displayChoco() {
    if (rand) {
        //block = document.querySelector(`[data-id='${rand}']`);  // Commenté car non obligatoire
        block.classList.remove('chocobo');
        block.style.backgroundImage = '';
    }
    var index = Math.floor(Math.random()*3);
    rand = Math.floor(Math.random()*numBlocks) + 1;
    block = document.querySelector(`[data-id='${rand}']`);
    block.classList.add('chocobo');
    block.style.backgroundImage = images[index];
    //console.log(rand);
}

function verifScore() {
    if (score == 10) {
        clearInterval(timer);
        clearInterval(countdown);
        timeLeft.innerText = `Timer : 0 s`
        board.innerHTML = '';
        board.style.border = "none";
        var element = `<div class="result">You Won ! Your score is ${score} pt !</div>`;
        board.innerHTML += element;
    } else if (score <= 0) {
        score = 0;
        clearInterval(timer);
        clearInterval(countdown);
        timeLeft.innerText = `Timer : 0 s`
        board.innerHTML = '';
        board.style.border = "none";
        var element = `<div class="result">You lose ! Your score is ${score} pt !</div>`;
        board.innerHTML += element;
    }
}
