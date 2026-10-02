const gameScreen = document.getElementById("gameScreen");
const gameTitle = document.getElementById("gameTitle");
const gameMessage = document.getElementById("gameMessage");
const startBtn = document.getElementById("startBtn");
const bestScore = document.getElementById("bestScore");
const historyList = document.getElementById("historyList");
const resetBestBtn = document.getElementById("resetBestBtn");

let gameState = "waiting";
let goTime = 0;
let delayTimer = null;
let attempts = [];
let personalBest = localStorage.getItem("reactionBest");

if (personalBest !== null) {
  bestScore.textContent = `${personalBest}ms`;
}

function setGameState(newState) {
  gameState = newState;
  gameScreen.className = "game-screen";
  gameScreen.classList.add(newState);
}

function playBeepSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 650;
  gainNode.gain.value = 0.12;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    audioContext.close();
  }, 120);
}

function vibrateDevice(pattern = 80) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

function startGame(event) {
  if (event) {
    event.stopPropagation();
  }

  clearTimeout(delayTimer);
  setGameState("countdown");

  gameTitle.textContent = "Wait for it...";
  gameMessage.textContent = "Do not click yet. Wait for the green flash.";
  startBtn.style.display = "none";

  const randomDelay = Math.floor(Math.random() * 2500) + 1500;
  delayTimer = setTimeout(showGoState, randomDelay);
  gameScreen.focus();
}

function showGoState() {
  setGameState("go");

  gameTitle.textContent = "Click Now!";
  gameMessage.textContent = "Tap, click, or press Space as fast as possible.";

  goTime = performance.now();

  playBeepSound();
  vibrateDevice();
}

function handleReactionAttempt() {
  if (
    gameState === "waiting" ||
    gameState === "result" ||
    gameState === "tooearly"
  ) {
    return;
  }

  if (gameState === "countdown") {
    clearTimeout(delayTimer);
    showTooEarly();
    return;
  }

  if (gameState === "go") {
    const reactionTime = Math.round(performance.now() - goTime);
    showResult(reactionTime);
  }
}

function showResult(reactionTime) {
  setGameState("result");

  gameTitle.textContent = `${reactionTime}ms`;
  gameMessage.textContent = getReactionRating(reactionTime);

  updateScores(reactionTime);

  startBtn.textContent = "Play Again";
  startBtn.style.display = "inline-block";
}

function showTooEarly() {
  setGameState("tooearly");

  gameTitle.textContent = "Too Early!";
  gameMessage.textContent = "You jumped the signal. Try again.";

  startBtn.textContent = "Try Again";
  startBtn.style.display = "inline-block";

  vibrateDevice([90, 40, 90]);
}

function getReactionRating(milliseconds) {
  if (milliseconds < 200) {
    return "Superhuman";
  }

  if (milliseconds <= 300) {
    return "Elite Reflexes";
  }

  if (milliseconds <= 400) {
    return "Above Average";
  }

  if (milliseconds <= 500) {
    return "Average Human";
  }

  return "Needs more coffee";
}

function updateScores(reactionTime) {
  attempts.unshift(reactionTime);
  attempts = attempts.slice(0, 5);

  if (personalBest === null || reactionTime < Number(personalBest)) {
    personalBest = String(reactionTime);
    bestScore.textContent = `${personalBest}ms`;
    localStorage.setItem("reactionBest", personalBest);
  }

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  attempts.forEach((attempt, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Attempt ${index + 1}: ${attempt}ms - ${getReactionRating(attempt)}`;
    historyList.appendChild(listItem);
  });
}

function resetBestScore(event) {
  event.stopPropagation();

  personalBest = null;
  localStorage.removeItem("reactionBest");
  bestScore.textContent = "No attempts yet";
}

function handleKeyPress(event) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();

    if (document.activeElement === startBtn) {
      return;
    }

    handleReactionAttempt();
  }
}

startBtn.addEventListener("click", startGame);
gameScreen.addEventListener("click", handleReactionAttempt);
resetBestBtn.addEventListener("click", resetBestScore);
gameScreen.addEventListener("keydown", handleKeyPress);
