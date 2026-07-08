const gameGrid = document.getElementById("gameGrid");
const scoreboardList = document.getElementById("scoreboardList");
const coinCount = document.getElementById("coinCount");
const coinMessage = document.getElementById("coinMessage");
const addCoinsBtn = document.getElementById("addCoinsBtn");
const marqueeText = document.getElementById("marqueeText");
const resetScoresBtn = document.getElementById("resetScoresBtn");

let coins = 3;
let scoreboard = [];

const gameList = [
  { id: "game1", title: "VOID RUNNER", genre: "SHOOTER", color: "#00f7ff", highScore: 0, pixelIcon: "VR" },
  { id: "game2", title: "PIXEL SLAYER", genre: "FIGHTER", color: "#ff2bd6", highScore: 0, pixelIcon: "PS" },
  { id: "game3", title: "BLOCK BUSTER 99", genre: "PUZZLE", color: "#ffe600", highScore: 0, pixelIcon: "BB" },
  { id: "game4", title: "GHOST HIGHWAY", genre: "RACER", color: "#ff8c00", highScore: 0, pixelIcon: "GH" },
  { id: "game5", title: "NEON STRIKER", genre: "SPORTS", color: "#00ff88", highScore: 0, pixelIcon: "NS" },
  { id: "game6", title: "LASER DUNGEON", genre: "RPG", color: "#9b5cff", highScore: 0, pixelIcon: "LD" },
  { id: "game7", title: "TURBO FIST", genre: "FIGHTER", color: "#ff1f4f", highScore: 0, pixelIcon: "TF" },
  { id: "game8", title: "STAR WRAITH", genre: "SHOOTER", color: "#2979ff", highScore: 0, pixelIcon: "SW" }
];

function renderGameGrid() {
  gameGrid.innerHTML = "";

  gameList.forEach(function (game) {
    const gameCard = document.createElement("article");

    gameCard.className = "game-card";
    gameCard.dataset.gameId = game.id;
    gameCard.style.setProperty("--accent", game.color);

    gameCard.innerHTML = `
      <div class="pixel-icon">${game.pixelIcon}</div>

      <h3 class="game-title">${game.title}</h3>

      <span class="genre-tag">${game.genre}</span>

      <p class="high-score">
        High Score:
        <span data-score-id="${game.id}">
          ${game.highScore}
        </span>
      </p>

      <button class="play-btn" type="button" data-play-id="${game.id}">
        Play
      </button>

      <div class="loading-shell">
        <div class="loading-fill"></div>
      </div>

      <p class="game-status"></p>
    `;

    gameGrid.appendChild(gameCard);
  });

  bindPlayButtons();
  updateCoinDisplay();
}

function bindPlayButtons() {
  document.querySelectorAll("[data-play-id]").forEach(function (button) {
    button.addEventListener("click", function () {
      launchGame(button.dataset.playId);
    });
  });
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

  coins--;

  saveArcadeData();
  updateCoinDisplay();

  playStartSound();
  vibrateDevice(40);

  playButton.disabled = true;
  statusText.textContent = "LOADING...";

  fakeLoadingBar(selectedCard, function () {
    const randomScore = Math.floor(Math.random() * 99000) + 1000;
    const playerInitials = getRandomInitials();

    playGameOverSound();
    vibrateDevice([80, 40, 80]);

    statusText.textContent = "GAME OVER - INSERT COIN";
    statusText.classList.add("game-over");

    addScore(playerInitials, selectedGame.title, randomScore);
    updateHighScore(gameId, randomScore);

    setTimeout(function () {
      statusText.classList.remove("game-over");

      if (coins > 0) {
        playButton.disabled = false;
      }
    }, 900);
  });
}

function fakeLoadingBar(cardElement, callback) {
  const loadingFill = cardElement.querySelector(".loading-fill");
  let progress = 0;

  loadingFill.style.width = "0%";

  const loadingTimer = setInterval(function () {
    progress += 5;
    loadingFill.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(loadingTimer);
      callback();

      setTimeout(function () {
        loadingFill.style.width = "0%";
      }, 700);
    }
  }, 80);
}

function addScore(playerInitials, gameName, score) {
  scoreboard.push({
    playerInitials: playerInitials,
    gameName: gameName,
    score: score
  });

  scoreboard.sort(function (firstScore, secondScore) {
    return secondScore.score - firstScore.score;
  });

  scoreboard = scoreboard.slice(0, 5);

  saveArcadeData();
  renderScoreboard();
  updateMarquee();
}

function renderScoreboard() {
  scoreboardList.innerHTML = "";

  if (scoreboard.length === 0) {
    scoreboardList.innerHTML = `
      <li class="empty-score">
        No scores yet. Play a game.
      </li>
    `;

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

      <strong>${scoreEntry.score}</strong>
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

    const highScoreText = document.querySelector(`[data-score-id="${gameId}"]`);

    highScoreText.textContent = selectedGame.highScore;

    saveArcadeData();
  }
}

function updateCoinDisplay() {
  coinCount.textContent = coins;

  coinCount.classList.remove("coin-pulse");
  void coinCount.offsetWidth;
  coinCount.classList.add("coin-pulse");

  const playButtons = document.querySelectorAll(".play-btn");

  playButtons.forEach(function (button) {
    button.disabled = coins <= 0;
  });

  if (coins <= 0) {
    coinMessage.textContent = "No coins left!";
    addCoinsBtn.style.display = "inline-block";
  } else {
    coinMessage.textContent = "";
    addCoinsBtn.style.display = "none";
  }
}

function updateMarquee() {
  const topScore = scoreboard.length > 0
    ? scoreboard[0].score
    : "00000";

  marqueeText.textContent = `
    INSERT COIN / PRESS START / HIGH SCORE: ${topScore} /
    INSERT COIN / PRESS START / HIGH SCORE: ${topScore} /
  `;
}

function addCoins() {
  coins = 3;

  saveArcadeData();
  playCoinSound();
  vibrateDevice(60);
  updateCoinDisplay();
}

function resetArcade() {
  localStorage.removeItem("retroArcadeData");

  coins = 3;
  scoreboard = [];

  gameList.forEach(function (game) {
    game.highScore = 0;
  });

  playResetSound();
  vibrateDevice([60, 40, 60]);

  renderGameGrid();
  renderScoreboard();
  updateCoinDisplay();
  updateMarquee();
}

function saveArcadeData() {
  const savedGameScores = gameList.map(function (game) {
    return {
      id: game.id,
      highScore: game.highScore
    };
  });

  const arcadeData = {
    coins: coins,
    scoreboard: scoreboard,
    gameScores: savedGameScores
  };

  localStorage.setItem(
    "retroArcadeData",
    JSON.stringify(arcadeData)
  );
}

function loadArcadeData() {
  const savedData = localStorage.getItem("retroArcadeData");

  if (!savedData) {
    return;
  }

  try {
    const arcadeData = JSON.parse(savedData);

    coins = arcadeData.coins ?? 3;
    scoreboard = arcadeData.scoreboard ?? [];

    if (arcadeData.gameScores) {
      arcadeData.gameScores.forEach(function (savedGame) {
        const matchingGame = gameList.find(function (game) {
          return game.id === savedGame.id;
        });

        if (matchingGame) {
          matchingGame.highScore = savedGame.highScore;
        }
      });
    }
  } catch (error) {
    localStorage.removeItem("retroArcadeData");
  }
}

function getRandomInitials() {
  const initials = [
    "FAZ",
    "CPU",
    "NPC",
    "RDX",
    "LOL",
    "AAA",
    "KHI",
    "DEV"
  ];

  const randomIndex = Math.floor(
    Math.random() * initials.length
  );

  return initials[randomIndex];
}

function playBeepSound(frequency, duration, type) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playStartSound() {
  playBeepSound(520, 0.12, "square");
}

function playGameOverSound() {
  playBeepSound(180, 0.25, "sawtooth");
}

function playCoinSound() {
  playBeepSound(760, 0.12, "triangle");

  setTimeout(function () {
    playBeepSound(980, 0.1, "triangle");
  }, 90);
}

function playErrorSound() {
  playBeepSound(120, 0.18, "square");
}

function playResetSound() {
  playBeepSound(300, 0.12, "square");

  setTimeout(function () {
    playBeepSound(180, 0.18, "square");
  }, 110);
}

function vibrateDevice(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

addCoinsBtn.addEventListener("click", addCoins);
resetScoresBtn.addEventListener("click", resetArcade);

loadArcadeData();
renderGameGrid();
renderScoreboard();
updateMarquee();
