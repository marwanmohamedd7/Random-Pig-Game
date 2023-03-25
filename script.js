"use strict";
let current;
let scores;
let dice;
let playing;
let playersNames = [``, ``];
let countWinGames = [0, 0];
let active = 0;
let winScore = 250;
let winGames = 5;

//////////////intialization_function (Reset and Restart new game)//////////////
function intialization() {
  checkName();
  checkGamesWins();
  current = 0;
  active = 0;
  scores = [0, 0];
  playing = true;
  printWinGames(0);
  printWinGames(1);
  removePlayerWinner(0);
  removePlayerWinner(1);
  player(0).classList.add("player--active");
  player(1).classList.remove("player--active");
  playerScore(0);
  playerScore(1);
  currentScore(0);
  currentScore(1);
  imgAddClass();
}

function checkGamesWins() {
  if (
    countWinGames[active] > 0 &&
    countWinGames[active] < Math.ceil(winGames / 2)
  ) {
    countWinGames = [countWinGames[0], countWinGames[1]];
  } else {
    countWinGames = [0, 0];
  }
}

///////////////////check
function checkName() {
  if (playersNames[active] === ``) {
    if (playerName(active).textContent === `Winner`) {
      playerName(active).textContent = `player ${active === 0 ? 1 : 2}`;
    } else {
      playerName(active).textContent;
    }
  } else {
    if (playerName(active).textContent === `Winner`) {
      playerName(active).textContent = playersNames[active];
    } else {
      playerName(active).textContent = playersNames[active];
    }
  }
}
/////////////////Enter-players-names//////////////////
function inializePlayersName() {
  for (let i = 0; i < playersNames.length; i++) {
    playersNames[i] = prompt(`Player ${i + 1}: Enter Your Name ... (Optional)`);
    playersNames[i] === ``
      ? (playersNames[i] = `Player ${i + 1}`)
      : (playersNames[i] = playersNames[i]);
    playerName(i).textContent = playersNames[i];
  }
  winScore = Number(prompt(`What's Your Target Score To Win? (Optional)`));
  winScore === 0 ? (winScore = 250) : (winScore = winScore);
  winGames = Number(
    prompt(`Best Of ...? (Example: Best of 3 , 5 or 7 ..... etc? (Optional)`)
  );
  winGames === 0 ? (winGames = 5) : (winGames = winGames);
}

////////////identification-Game-Winner////////////
function gameWinner() {
  return document.querySelector(`.game-winner`);
}
////////////identification-Game-Winner-name////////////
function gameWinnerName() {
  return document.querySelector(`.game-winner-name h4`);
}
///////////Player_score/////////////
function playerScore(number) {
  return (document.getElementById(`score--${number}`).textContent =
    scores[number]);
}
///////////////print-counted-win-games//////////////
function printWinGames(number) {
  return (document.querySelector(`.win-game--${number} h1`).textContent =
    countWinGames[number]);
}
///////////current_Player_score/////////////
function currentScore(number) {
  return (document.getElementById(`current--${number}`).textContent = current);
}
///////////Reset-Current-Score/////////////
function resetCurrentScore(number) {
  current = 0;
  return (document.getElementById(`current--${number}`).textContent = current);
}
///////////dice_imgs/////////////
function diceImg() {
  return document.querySelector(".dice");
}
///////////dice_imgs_(Remove-display-None)/////////////
function imgRemoveClass() {
  diceImg().classList.remove("hidden");
}
///////////dice_imgs_(Add-display-None)/////////////
function imgAddClass() {
  diceImg().classList.add("hidden");
}
///////////Player-identification/////////////
function player(number) {
  return document.querySelector(`.player--${number}`);
}
///////////Player-Name-identification/////////////
function playerName(number) {
  return document.querySelector(`.player--${number} .name`);
}
///////////active_Player/////////////
function activePlayer(number) {
  return player(number).classList.toggle("player--active");
}

///////////Player_Winner-display/////////////
function addPlayerWinner(number) {
  player(number).classList.add("player--winner");
}
function removePlayerWinner(number) {
  player(number).classList.remove("player--winner");
}
//////////////////////////////////////////////

///////////New-Game-button/////////////
function btnNew() {
  return document.querySelector(`.btn--new`);
}
///////////Roll-Dice-button/////////////
function btnRoll() {
  return document.querySelector(`.btn--roll`);
}
///////////Hold-button/////////////
function btnHold() {
  return document.querySelector(`.btn--hold`);
}
///////////Detect-Current-active-Player/////////////
function switchPlayer() {
  resetCurrentScore(active);
  active === 0 ? (active = 1) : (active = 0);
  activePlayer(active);
}
///////////////Generate_New_Random_Number///////////////
function generateRandomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

//////////////rolling_dice_function//////////////
function rollDice() {
  dice = generateRandomNumber();
  imgRemoveClass();
  diceImg().src = `dice-${dice}.png`;
  if (dice !== 1) {
    current += dice;
    currentScore(active);
  } else {
    scores[active] += current;
    playerScore(active);
    activePlayer(active);
    if (scores[active] >= winScore) {
      countWinGames[active]++;
      printWinGames(active);
      imgAddClass();
      addPlayerWinner(active);
      activePlayer(active);
      resetCurrentScore(active);
      playerName(active).textContent = `Winner`;
      playing = false;
    } else {
      switchPlayer();
    }
  }
}
//////////////Hold_function//////////////
function hold() {
  scores[active] += current;
  playerScore(active);
  activePlayer(active);
  if (scores[active] >= winScore) {
    countWinGames[active]++;
    printWinGames(active);
    imgAddClass();
    addPlayerWinner(active);
    activePlayer(active);
    resetCurrentScore(active);
    playerName(active).textContent = `Winner`;
    playing = false;
  } else {
    switchPlayer();
  }
}

//////////////check-who-is-the-game-winner every half second//////////////
setInterval(function () {
  if (
    countWinGames[active] === Math.ceil(winGames / 2) &&
    countWinGames[active] !== 0
  ) {
    playing = false;
    if (playersNames[active] === ``) {
      gameWinnerName().textContent = `player ${active + 1}`;
    } else {
      gameWinnerName().textContent = playersNames[active];
    }
    gameWinner().classList.remove(`hidden`);
    imgAddClass();
    clearInterval();
  }
}, 1000);

//////////////////Mouse-Click-Events//////////////////////
btnRoll().addEventListener("click", function () {
  if (playing) {
    rollDice();
  }
});

btnNew().addEventListener("click", function () {
  intialization();
});

btnHold().addEventListener("click", function () {
  if (playing) {
    hold();
  }
});

//////////////////keyBoard-press-Events//////////////////////
document.addEventListener("keydown", function (e) {
  if (playing) {
    if (e.key === "Enter") {
      $(btnRoll()).click();
    } else if (e.key === " ") {
      $(btnHold()).click();
    }
  }
  if (e.key === "Escape") {
    if (gameWinner().classList.contains(`hidden`) === false) {
      gameWinner().classList.add(`hidden`);
      intialization();
    } else {
      $(btnNew()).click();
    }
  } else if (
    e.key === "Enter" &&
    gameWinner().classList.contains(`hidden`) === false
  ) {
    gameWinner().classList.add(`hidden`);
    intialization();
  }
});

window.addEventListener("load", function () {
  inializePlayersName();
  intialization();
});
