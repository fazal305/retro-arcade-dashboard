# Retro Arcade Dashboard

A neon-styled retro arcade launcher built with HTML, CSS, and vanilla JavaScript.

## Live Demo

https://fazal305.github.io/retro-arcade-dashboard/

## Project Overview

Retro Arcade Dashboard recreates the feel of an old arcade cabinet interface in the browser. It includes fake game machines, coins, loading bars, generated scores, persistent high scores, a scoreboard, Web Audio API beeps, vibration feedback, and neon visual effects.

The project is front-end only and works without a build step or external framework.

## Screenshot

![Retro Arcade Dashboard Screenshot](image.png)

## Features

- Eight fake retro arcade game cards
- Unique neon accent color for each machine
- Coin-based play system
- Add coins button when balance reaches zero
- Fake loading animation before each generated score
- Top five scoreboard
- Per-game high score tracking
- localStorage persistence
- Reset scoreboard system
- Web Audio API sound effects
- Mobile vibration feedback when supported
- Scrolling arcade marquee
- Responsive dashboard layout

## Included Games

| Game            | Genre   |
| --------------- | ------- |
| VOID RUNNER     | SHOOTER |
| PIXEL SLAYER    | FIGHTER |
| BLOCK BUSTER 99 | PUZZLE  |
| GHOST HIGHWAY   | RACER   |
| NEON STRIKER    | SPORTS  |
| LASER DUNGEON   | RPG     |
| TURBO FIST      | FIGHTER |
| STAR WRAITH     | SHOOTER |

## Controls

| Action     | Result                                       |
| ---------- | -------------------------------------------- |
| Click Play | Spend one coin and generate a score          |
| Add Coins  | Refill the coin count                        |
| Reset      | Clear saved scores and reset all high scores |

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Web Audio API
- localStorage

## Project Structure

```text
retro-arcade-dashboard/
|-- index.html
|-- arcade-styles.css
|-- arcade-script.js
|-- image.png
|-- README.md
|-- LICENSE
```

## Learning Notes

This project practices:

- DOM rendering from JavaScript arrays
- State management
- Sorting and limiting scoreboard data
- localStorage save/load behavior
- CSS Grid layouts
- CSS glow effects and animations
- Browser sound generation with Web Audio API
- Responsive UI design

## Author

Fazal Abbas

- GitHub: https://github.com/fazal305
- LinkedIn: https://www.linkedin.com/in/fazal-abbas-4653dg86

## License

This project is licensed under the MIT License.
