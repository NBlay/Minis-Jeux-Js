const choices = ['Pon', 'Ken', 'Jan'];
var result;
var result2;
var playerScore = 0;
var computerScore = 0;

document.querySelector("#player-choice").addEventListener('click', (el) => {
    document.querySelector("#computer-choice").innerHTML = '';

    document.querySelectorAll('.player').forEach((element) => {
        element.classList.remove('border');
    })
    el.target.classList.add('border');

    var player = el.target.dataset.choice;
    var rand = Math.floor(Math.random()*3);
    var robot = choices[rand];

    var x = document.createElement("img");
    x.setAttribute("src", `img/${robot}.png`);
    document.querySelector("#computer-choice").appendChild(x);

    if(player === robot) {
        result = "C'est une égalité !";
    } else if((player === "Pon" && robot === "Jan") || (player === "Ken" && robot === "Pon") || (player === "Jan" && robot === "Ken")) {
        playerScore++;
        result = `Vous gagné la manche ! Vous avez gagné ${playerScore} manche(s)`;
        if(playerScore == 3) {
            result2 = "Vous avez remportez 3 manches ! Vous rempotez la partie !";
            document.querySelector('#result').innerText = result2;
            verifscore();
            return;
        }
    } else {
        computerScore++;
        result = `L'ordinateur gagne la manche ! L'ordinateur à gagné ${computerScore} manche(s)`;
        if(computerScore == 3) {
            result2 = "L'ordinateur à remporter 3 manches ! L'ordinateur remporte la partie !";
            document.querySelector('#result').innerText = result2;
            verifscore();
            return;
        }
    }
    document.querySelector('#result').innerText = result;
});


function verifscore() {
    if(computerScore == 3 || playerScore == 3) {
        document.querySelector('#replay').classList.remove('none');
        playerScore = 0;
        computerScore = 0;
    }
    document.querySelector('#replay').addEventListener('click', () => {
        document.getElementById('replay').classList.add('none');
    });
    return;
}
