// Moves computer and player can play
const choices = ['rock', 'paper', 'scissors'];

let computerScore = 0;
let playerScore = 0;


const choiceButton = document.querySelectorAll('.player-choices-button');

for (let i = 0; i < choices.length; i++) {
  choiceButton[i].addEventListener('click', declareWinner);
}

function declareWinner(event) {

  const computerChoice = choices[/*Math.floor*/~~((Math.random() * choices.length))];
  // ~~ is a faster substitute for Math.floor() valid only for positive numbers
  const playerChoice = event.target.value;
  // event.target selects the target/component on which we have clicked
  // .value checks the value attribute of the target set by us

  const computerChoicesButton = document.querySelectorAll('.computer-choices-button');
  const playerChoicesButton = document.querySelectorAll('.player-choices-button');

  computerChoicesButton.forEach((button) => {
    button.classList.remove('active-button');
  });

  playerChoicesButton.forEach((button) => {
    button.classList.remove('active-button');
  });

  computerChoicesButton[choices.indexOf(computerChoice)].classList.add('active-button');
  playerChoicesButton[choices.indexOf(playerChoice)].classList.add('active-button');

  const playerSign = document.querySelector('.player-sign-img');
  const computerSign = document.querySelector('.computer-sign-img');
  computerSign.src = `images/computer-${computerChoice}.png`;
  playerSign.src = `images/player-${playerChoice}.png`;

  const scores = document.querySelector('.scores');
  const whoScores = document.querySelector('.who-scores');
  whoScores.textContent = '';
  const writeLogsOl = document.querySelector('.write-logs-ol');

  if (playerChoice === computerChoice) {
    whoScores
    whoScores.textContent = "Draw!";
    const writeLogsOlLi = document.createElement('li');
    writeLogsOlLi.appendChild(document.createTextNode(`Both use ${computerChoice}, its a draw!`));
    writeLogsOl.appendChild(writeLogsOlLi);
  } else if (((playerChoice === 'rock') && (computerChoice === 'scissors')) ||
    ((playerChoice === 'paper') && (computerChoice === 'rock')) ||
    ((playerChoice === 'scissors') && (computerChoice === 'paper'))) {
    playerScore += 1;
    whoScores
    whoScores.innerHTML = "Player<br>Scores"
    scores.textContent = `Scores: ${computerScore} - ${playerScore}`;
    const writeLogsOlLi = document.createElement('li');
    writeLogsOlLi.appendChild(document.createTextNode(`Player uses ${playerChoice} and computer uses ${computerChoice}, player scores.`));
    writeLogsOl.appendChild(writeLogsOlLi);
  } else {
    computerScore += 1;
    scores.textContent = `Scores: ${computerScore} - ${playerScore}`;
    whoScores
    whoScores.innerHTML = "Computer<br>Scores"
    const writeLogsOlLi = document.createElement('li');
    writeLogsOlLi.appendChild(document.createTextNode(`Player uses ${playerChoice} and computer uses ${computerChoice}, computer scores.`));
    writeLogsOl.appendChild(writeLogsOlLi);
  }

  let i = writeLogsOl.childNodes.length;
  while (i--) {
    writeLogsOl.appendChild(writeLogsOl.childNodes[i]);
  }

  if (playerScore === 5 || computerScore === 5) {

    const alert = document.querySelector('.win-lose-alert');
    const alertTitle = document.querySelector('.win-lose-alert-title');
    const playAgainButton = document.querySelector('.play-again-button');

    for (let i = 0; i < choices.length; i++) {
      choiceButton[i].style.pointerEvents = 'none';
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    sleep(1000).then(() => {
      alert.style.display = 'block';
    });

    if (playerScore === 5) {
      alertTitle.textContent = 'You Win!!!'
    } else if (computerScore === 5) {
      alertTitle.textContent = 'You Lose'
    }

    playAgainButton.addEventListener('click', () => location.reload());

    // setTimeout(() => location.reload(), 2000);
  }
}
