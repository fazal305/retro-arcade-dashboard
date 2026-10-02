(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("game") || "";

  const titleEl = document.getElementById("playerTitle");
  const genreEl = document.getElementById("playerGenre");
  const descriptionEl = document.getElementById("playerDescription");
  const repoLinkEl = document.getElementById("repoLink");
  const frameEl = document.getElementById("gameFrame");

  const game =
    (typeof realGames !== "undefined" &&
      realGames.find(function (entry) {
        return entry.slug === slug;
      })) ||
    null;

  if (!game || !slug) {
    titleEl.textContent = "Cabinet Not Found";
    genreEl.textContent = "";
    descriptionEl.textContent =
      "No game was selected. Head back to the dashboard and pick a cabinet.";
    repoLinkEl.style.display = "none";
    frameEl.style.display = "none";
    return;
  }

  document.title = game.title + " | Retro Arcade Dashboard";
  document.documentElement.style.setProperty("--accent", game.color);

  titleEl.textContent = game.title;
  genreEl.textContent = game.genre;
  descriptionEl.textContent = game.description;
  repoLinkEl.href = "https://github.com/fazal305/" + game.repo;

  frameEl.src = "games/" + game.slug + "/index.html";
})();
