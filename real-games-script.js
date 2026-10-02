(function () {
  const realGameGrid = document.getElementById("realGameGrid");

  if (!realGameGrid || typeof realGames === "undefined") {
    return;
  }

  realGameGrid.innerHTML = "";

  realGames.forEach(function (game) {
    const card = document.createElement("article");

    card.className = "game-card real-game-card";
    card.style.setProperty("--accent", game.color);

    card.innerHTML = `
      <div class="pixel-icon">${game.icon}</div>

      <h3 class="game-title">${game.title}</h3>

      <span class="genre-tag">${game.genre}</span>

      <p class="real-game-description">${game.description}</p>

      <a class="play-btn real-play-btn" href="player.html?game=${encodeURIComponent(game.slug)}">
        Play
      </a>
    `;

    realGameGrid.appendChild(card);
  });
})();
