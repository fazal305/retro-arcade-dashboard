# Retro Arcade Dashboard

A neon arcade control panel built with HTML, CSS, and vanilla JavaScript.

Retro Arcade Dashboard turns a simple browser page into a playful arcade launcher with animated game machines, coin tracking, generated scores, local saves, and a live top-score board. It is designed as a front-end practice project with a clear visual theme and interactive state management.

## Live Demo

https://fazal305.github.io/retro-arcade-dashboard/

## Preview

![Retro Arcade Dashboard screenshot](image.png)

## Features

- Responsive arcade dashboard layout
- Eight fictional game machine cards
- Coin-based play flow with refill support
- Animated loading bars for each game launch
- Random score generation after every session
- Top-five scoreboard sorted by score
- Per-game high score tracking
- Local browser save using `localStorage`
- Retro beep effects using the Web Audio API
- Mobile vibration feedback where supported
- Reset button for clearing saved arcade data
- Reduced-motion support for users who prefer calmer animation

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Web Audio API
- localStorage API
- Google Fonts

## Project Structure

```text
retro-arcade-dashboard/
|-- index.html
|-- arcade-styles.css
|-- arcade-script.js
|-- image.png
|-- LICENSE
`-- README.md
```

## What I Practiced

- Rendering UI from JavaScript data
- Managing browser state without a framework
- Sorting and limiting scoreboard records
- Saving and restoring data with `localStorage`
- Building responsive card grids
- Creating neon effects with CSS variables
- Handling buttons, disabled states, and feedback messages
- Adding small accessibility improvements with semantic HTML and live regions

## Run Locally

Open `index.html` in a browser.

No build step or package installation is required.

## Author

Built by Fazal Abbas.

- GitHub: https://github.com/fazal305
- LinkedIn: https://www.linkedin.com/in/fazal-abbas-4653dg86

## License

This project is licensed under the MIT License.
