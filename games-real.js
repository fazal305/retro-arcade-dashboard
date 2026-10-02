/**
 * Metadata for the real, playable games folded into this dashboard from
 * their own standalone repos (see each entry's `repo`). Each game lives in
 * its own self-contained static bundle under games/<slug>/ and is launched
 * in player.html inside an iframe, with the dashboard's own chrome wrapped
 * around it.
 */
const realGames = [];

if (typeof module !== "undefined" && module.exports) {
  module.exports = realGames;
}
