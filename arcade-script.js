const gameGrid = document.getElementById("gameGrid");
const scoreboardList = document.getElementById("scoreboardList");
const coinCount = document.getElementById("coinCount");
const coinMessage = document.getElementById("coinMessage");
const addCoinsBtn = document.getElementById("addCoinsBtn");
const marqueeText = document.getElementById("marqueeText");
const resetScoresBtn = document.getElementById("resetScoresBtn");

const storageKey = "retroArcadeData";
const maxScores = 5;
let coins = 3;
let scoreboard = [];
let audioContext = null;

const gameList = [
  { id: "void-runner", title: "VOID RUNNER", genre: "SHOOTER", color: "#00f7ff", highScore: 0, icon: "VR" },
  { id: "pixel-duel", title: "PIXEL DUEL", genre: "FIGHTER", color: "#ff2bd6", highScore: 0, icon: "PD" },
  { id: "block-99", title: "BLOCK BUSTER 99", genre: "PUZZLE", color: "#ffe600", highScore: 0, icon: "B9" },
  { id: "neon-highway", title: "NEON HIGHWAY", genre: "RACER", color: "#ff8c00", highScore: 0, icon: "NH" },
  { id: "neon-striker", title: "NEON STRIKER", genre: "SPORTS", color: "#00ff88", highScore: 0, icon: "NS" },
  { id: "laser-quest", title: "LASER QUEST", genre: "RPG", color: "#9b5cff", highScore: 0, icon: "LQ" },
  { id: "turbo-fist", title: "TURBO FIST", genre: "FIGHTER", color: "#ff1f4f", highScore: 0, icon: "TF" },
  { id: "star-drifter", title: "STAR DRIFTER", genre: "SHOOTER", color: "#2979ff", highScore: 0, icon: "SD" }
];

function renderGameGrid() {
  gameGrid.innerHTML = "";

  gameList.forEach(function (game) {
    const gameCard = document.createElement("article");
    gameCard.className = "game-card";
    gameCard.dataset.gameId = game.id;
    gameCard.style.setProperty("--accent", game.color);

    gameCard.innerHTML = `
      <div class="pixel-icon" aria-hidden="true">${game.icon}</div>
      <h3 class="game-title">${game.title}</h3>
      <span class="genre-tag">${game.genre}</span>
      <p class="high-score">
        High Score:
        <span data-score-id="${game.id}">${formatScore(game.highScore)}</span>
      </p>
      <button class="play-btn" type="button" data-play-id="${game.id}">
        Play
      </button>
      <div class="loading-shell" aria-hidden="true">
        <div class="loading-fill"></div>
      </div>
      <p class="game-status" aria-live="polite"></p>
    `;

    gameGrid.appendChild(gameCard);
  });

  updateCoinDisplay();
}

function launchGame(gameId) {
  if (coins <= 0) {
    playErrorSound();
    vibrateDevice(120);
    updateCoinDisplay();
    return;
  }

  const selectedGame = gameList.find(function (game) {
    return game.id === gameId;
  });
  const selectedCard = document.querySelector(`[data-game-id="${gameId}"]`);
  const playButton = selectedCard.querySelector(".play-btn");
  const statusText = selectedCard.querySelector(".game-status");

  coins -= 1;
  saveArcadeData();
  updateCoinDisplay();

  playStartSound();
  vibrateDevice(40);

  playButton.disabled = true;
  statusText.textContent = "Loading machine...";
  statusText.classList.remove("game-over");

  fakeLoadingBar(selectedCard, function () {
    const score = Math.floor(Math.random() * 99000) + 1000;
    const playerInitials = getRandomInitials();

    playGameOverSound();
    vibrateDevice([80, 40, 80]);

    statusText.textContent = `Run finished: ${formatScore(score)} points`;
    statusText.classList.add("game-over");

    addScore(playerInitials, selectedGame.title, score);
    updateHighScore(gameId, score);

    window.setTimeout(function () {
      statusText.classList.remove("game-over");
      playButton.disabled = coins <= 0;
    }, 900);
  });
}

function fakeLoadingBar(cardElement, callback) {
  const loadingFill = cardElement.querySelector(".loading-fill");
  let progress = 0;

  loadingFill.style.width = "0%";

  const loadingTimer = window.setInterval(function () {
    progress += 5;
    loadingFill.style.width = `${progress}%`;

    if (progress >= 100) {
      window.clearInterval(loadingTimer);
      callback();

      window.setTimeout(function () {
        loadingFill.style.width = "0%";
      }, 700);
    }
  }, 70);
}

function addScore(playerInitials, gameName, score) {
  scoreboard.push({ playerInitials, gameName, score });
  scoreboard.sort(function (firstScore, secondScore) {
    return secondScore.score - firstScore.score;
  });
  scoreboard = scoreboard.slice(0, maxScores);

  saveArcadeData();
  renderScoreboard();
  updateMarquee();
}

function renderScoreboard() {
  scoreboardList.innerHTML = "";

  if (scoreboard.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-score";
    emptyItem.textContent = "No scores yet. Play a machine.";
    scoreboardList.appendChild(emptyItem);
    return;
  }

  scoreboard.forEach(function (scoreEntry, index) {
    const scoreItem = document.createElement("li");
    scoreItem.className = "score-entry";
    scoreItem.innerHTML = `
      <strong>#${index + 1}</strong>
      <div>
        <p>${scoreEntry.playerInitials}</p>
        <span>${scoreEntry.gameName}</span>
      </div>
      <strong>${formatScore(scoreEntry.score)}</strong>
    `;

    scoreboardList.appendChild(scoreItem);
  });
}

function updateHighScore(gameId, score) {
  const selectedGame = gameList.find(function (game) {
    return game.id === gameId;
  });

  if (score > selectedGame.highScore) {
    selectedGame.highScore = score;
    document.querySelector(`[data-score-id="${gameId}"]`).textContent = formatScore(score);
    saveArcadeData();
  }
}

function updateCoinDisplay() {
  coinCount.textContent = coins;
  coinCount.classList.remove("coin-pulse");
  void coinCount.offsetWidth;
  coinCount.classList.add("coin-pulse");

  document.querySelectorAll(".play-btn").forEach(function (button) {
    button.disabled = coins <= 0;
  });

  if (coins <= 0) {
    coinMessage.textContent = "No coins left.";
    addCoinsBtn.hidden = false;
  } else {
    coinMessage.textContent = "";
    addCoinsBtn.hidden = true;
  }
}

function updateMarquee() {
  const topScore = scoreboard.length > 0 ? formatScore(scoreboard[0].score) : "00000";
  marqueeText.textContent = `INSERT COIN / PRESS START / HIGH SCORE: ${topScore} / INSERT COIN / PRESS START / HIGH SCORE: ${topScore} /`;
}

function addCoins() {
  coins = 3;
  saveArcadeData();
  playCoinSound();
  vibrateDevice(60);
  updateCoinDisplay();
}

function resetArcade() {
  localStorage.removeItem(storageKey);
  coins = 3;
  scoreboard = [];

  gameList.forEach(function (game) {
    game.highScore = 0;
  });

  playResetSound();
  vibrateDevice([60, 40, 60]);
  renderGameGrid();
  renderScoreboard();
  updateMarquee();
}

function saveArcadeData() {
  const gameScores = gameList.map(function (game) {
    return {
      id: game.id,
      highScore: game.highScore
    };
  });

  localStorage.setItem(storageKey, JSON.stringify({ coins, scoreboard, gameScores }));
}

function loadArcadeData() {
  const savedData = localStorage.getItem(storageKey);

  if (!savedData) {
    return;
  }

  try {
    const arcadeData = JSON.parse(savedData);
    coins = Number.isInteger(arcadeData.coins) ? arcadeData.coins : 3;
    scoreboard = Array.isArray(arcadeData.scoreboard) ? arcadeData.scoreboard.slice(0, maxScores) : [];

    if (Array.isArray(arcadeData.gameScores)) {
      arcadeData.gameScores.forEach(function (savedGame) {
        const matchingGame = gameList.find(function (game) {
          return game.id === savedGame.id;
        });

        if (matchingGame && Number.isInteger(savedGame.highScore)) {
          matchingGame.highScore = savedGame.highScore;
        }
      });
    }
  } catch (error) {
    localStorage.removeItem(storageKey);
  }
}

function getRandomInitials() {
  const initials = ["FAZ", "CPU", "NPC", "RDX", "LOL", "AAA", "KHI", "DEV"];
  return initials[Math.floor(Math.random() * initials.length)];
}

function formatScore(score) {
  return String(score).padStart(5, "0");
}

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
}

function playBeepSound(frequency, duration, type) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.08, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

function playStartSound() {
  playBeepSound(520, 0.12, "square");
}

function playGameOverSound() {
  playBeepSound(180, 0.25, "sawtooth");
}

function playCoinSound() {
  playBeepSound(760, 0.12, "triangle");

  window.setTimeout(function () {
    playBeepSound(980, 0.1, "triangle");
  }, 90);
}

function playErrorSound() {
  playBeepSound(120, 0.18, "square");
}

function playResetSound() {
  playBeepSound(300, 0.12, "square");

  window.setTimeout(function () {
    playBeepSound(180, 0.18, "square");
  }, 110);
}

function vibrateDevice(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

gameGrid.addEventListener("click", function (event) {
  const playButton = event.target.closest("[data-play-id]");

  if (playButton) {
    launchGame(playButton.dataset.playId);
  }
});

addCoinsBtn.addEventListener("click", addCoins);
resetScoresBtn.addEventListener("click", resetArcade);

loadArcadeData();
renderGameGrid();
renderScoreboard();
updateMarquee();
