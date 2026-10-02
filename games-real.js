/**
 * Metadata for the real, playable games folded into this dashboard from
 * their own standalone repos (see each entry's `repo`). Each game lives in
 * its own self-contained static bundle under games/<slug>/ and is launched
 * in player.html inside an iframe, with the dashboard's own chrome wrapped
 * around it.
 */
const realGames = [
  {
    slug: "zombie-survival-choice-game",
    title: "Zombie Survival Choice Game",
    genre: "RPG",
    color: "#39ff14",
    icon: "ZS",
    description:
      "A dark text-based zombie survival RPG built with HTML, CSS, and vanilla JavaScript.",
    repo: "zombie-survival-choice-game",
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = realGames;
}
