let scores, roundScores, activePlayer, activeGame;

initGame()

//Functionality for rolling the dices
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (activeGame) {
        let dice_1 = Math.floor(Math.random() * 6) + 1;
        let dice_2 = Math.floor(Math.random() * 6) + 1;

        document.getElementById('dice_1').style.display = 'block';
        document.getElementById('dice_2').style.display = 'block';
        document.getElementById('dice_1').src = `./img/dice-${dice_1}.png`;
        document.getElementById('dice_2').src = `./img/dice-${dice_2}.png`;
        //Game logic
        if (dice_1 !== 1 && dice_2 !== 1) {
            roundScore += dice_1 + dice_2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (dice_1 === 1 && dice_2 === 1) {
            alert(`You roled two 1s, your entire score will be lost.`);
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else {
            nextPlayer();
        }
    }
});
//functionality for saving current score to the global player score
document.querySelector('.btn-hold').addEventListener('click', () => {
    if (activeGame) {
        scores[activePlayer] += roundScore;

        let input = document.querySelector('.final-score').value;
        let winningScore;
        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 200;
        }

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if a player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice_1').style.display = 'none';
            document.getElementById('dice_2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activeGame = false;
        } else {
            nextPlayer();
        }
    }
});
//Starts a new game
document.querySelector('.btn-new').addEventListener('click', initGame);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice_1').style.display = 'none';
    document.getElementById('dice_2').style.display = 'none';
};
//Initialization of the game
function initGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    activeGame = true;

    document.getElementById('dice_1').style.display = 'none';
    document.getElementById('dice_2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

};