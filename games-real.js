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
  {
    slug: "connect-four",
    title: "Connect Four",
    genre: "STRATEGY",
    color: "#ffcc00",
    icon: "C4",
    description:
      "A configurable Connect Four game with a Minimax + Alpha-Beta AI opponent.",
    repo: "connect-four",
  },
  {
    slug: "tetris-react",
    title: "Tetris (React)",
    genre: "PUZZLE",
    color: "#00f7ff",
    icon: "TR",
    description:
      "A polished, offline-first Tetris built with React: 7-bag randomizer, SRS rotation, hold/ghost pieces, and a smooth game loop.",
    repo: "tetris-react",
  },
  {
    slug: "imposter-word-game",
    title: "Imposter",
    genre: "PARTY",
    color: "#ff2bd6",
    icon: "IM",
    description:
      "A local pass-and-play social deduction word game for one device and a group of players.",
    repo: "imposter-word-game",
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = realGames;
}
