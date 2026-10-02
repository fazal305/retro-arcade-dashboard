const gameScenes = {
  start: {
    title: "The Outbreak",
    description:
      "2:17 AM. Karachi is silent, which is already suspicious. A scream echoes outside while your fridge makes a sound like it knows something.",
    choices: [
      {
        text: "Check your phone",
        nextScene: "checkPhone",
        healthChange: 0,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 0,
      },
      {
        text: "Go outside",
        nextScene: "goOutside",
        healthChange: -15,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 0,
      },
      {
        text: "Hide in the house",
        nextScene: "hideInHouse",
        healthChange: 5,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  checkPhone: {
    title: "Emergency Alert",
    description:
      "Your phone shows 41 missed calls and one emergency alert saying: Stay indoors. Amazing timing.",
    choices: [
      {
        text: "Follow the warning",
        nextScene: "hideInHouse",
        healthChange: 5,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Head downtown",
        nextScene: "downtown",
        healthChange: -5,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  goOutside: {
    title: "Street of Bad Decisions",
    description:
      "A zombie slowly turns toward you. Even the stray cats nearby look disappointed in your life choices.",
    choices: [
      {
        text: "Shoot the zombie",
        nextScene: "fightZombie",
        healthChange: 0,
        ammoChange: -1,
        requiresAmmo: true,
        daysChange: 0,
      },
      {
        text: "Run back inside",
        nextScene: "hideInHouse",
        healthChange: -10,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  hideInHouse: {
    title: "Locked In",
    description:
      "You barricade the door with a chair and pure denial. You find an old pistol hidden in a drawer.",
    choices: [
      {
        text: "Go scavenging downtown",
        nextScene: "downtown",
        healthChange: 0,
        ammoChange: 2,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Stay too long without food",
        nextScene: "starved",
        healthChange: -100,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 3,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  downtown: {
    title: "Downtown Ruins",
    description:
      "Cars burn quietly while broken signs flicker above empty streets. Somehow the billboard still says Mega Sale.",
    choices: [
      {
        text: "Search the pharmacy",
        nextScene: "pharmacy",
        healthChange: 10,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Loot the gun shop",
        nextScene: "gunShop",
        healthChange: -5,
        ammoChange: 4,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Hide in a store",
        nextScene: "hideInStore",
        healthChange: 0,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  pharmacy: {
    title: "Pharmacy Run",
    description:
      "You find medicine, snacks, and expired cough syrup. Apocalypse standards are extremely low now.",
    choices: [
      {
        text: "Help the stranger outside",
        nextScene: "helpStranger",
        healthChange: 10,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Ignore them and move on",
        nextScene: "safeZone",
        healthChange: 0,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 2,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  gunShop: {
    title: "Gun Shop",
    description:
      "Most of the weapons are gone, but you still find extra ammo hidden under the counter.",
    choices: [
      {
        text: "Fight through the alley",
        nextScene: "fightZombie",
        healthChange: -10,
        ammoChange: -1,
        requiresAmmo: true,
        daysChange: 1,
      },
      {
        text: "Run from the horde",
        nextScene: "runFromHorde",
        healthChange: -15,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  hideInStore: {
    title: "Mini Mart Survival",
    description:
      "Day 3. You smell terrible. Honestly, the zombies may avoid you on principle at this point.",
    choices: [
      {
        text: "Rest and eat supplies",
        nextScene: "helpStranger",
        healthChange: 15,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 2,
      },
      {
        text: "Wait too long",
        nextScene: "overrun",
        healthChange: -100,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 2,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  fightZombie: {
    title: "Close Encounter",
    description:
      "The zombie drops after one shot. Another immediately appears because life hates momentum.",
    choices: [
      {
        text: "Shoot again",
        nextScene: "safeZone",
        healthChange: -5,
        ammoChange: -1,
        requiresAmmo: true,
        daysChange: 1,
      },
      {
        text: "Punch the zombie",
        nextScene: "bitten",
        healthChange: -100,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 0,
      },
      {
        text: "Run away",
        nextScene: "runFromHorde",
        healthChange: -20,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  runFromHorde: {
    title: "The Horde",
    description:
      "You sprint through the streets while dozens of zombies chase behind you. Your lungs are filing complaints.",
    choices: [
      {
        text: "Climb onto a bus",
        nextScene: "safeZone",
        healthChange: -10,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Hide under a broken car",
        nextScene: "overrun",
        healthChange: -100,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 0,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  helpStranger: {
    title: "The Stranger",
    description:
      "A nervous stranger offers to guide you to the safe zone. Their smile feels extremely side-quest villain coded.",
    choices: [
      {
        text: "Trust the stranger",
        nextScene: "betrayedByStranger",
        healthChange: -20,
        ammoChange: -2,
        requiresAmmo: false,
        daysChange: 1,
      },
      {
        text: "Keep your distance",
        nextScene: "safeZone",
        healthChange: 0,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 2,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  betrayedByStranger: {
    title: "Betrayed",
    description:
      "The stranger steals your ammo and disappears into the night. Trust issues unlocked.",
    choices: [
      {
        text: "Chase after them",
        nextScene: "bitten",
        healthChange: -100,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 0,
      },
      {
        text: "Find another route",
        nextScene: "safeZone",
        healthChange: -10,
        ammoChange: 0,
        requiresAmmo: false,
        daysChange: 2,
      },
    ],
    isGameOver: false,
    isWin: false,
  },

  safeZone: {
    title: "You Survived!",
    description: "You finally reach the safe zone alive. Barely, but alive.",
    choices: [],
    isGameOver: false,
    isWin: true,
  },

  overrun: {
    title: "Game Over",
    description: "The horde breaks through and overwhelms you completely.",
    choices: [],
    isGameOver: true,
    isWin: false,
  },

  starved: {
    title: "Game Over",
    description:
      "You survived the zombies but forgot that humans unfortunately need food.",
    choices: [],
    isGameOver: true,
    isWin: false,
  },

  bitten: {
    title: "Game Over",
    description:
      "You were bitten. Infection spreads fast. Congratulations on your zombie career.",
    choices: [],
    isGameOver: true,
    isWin: false,
  },
};

let playerStats = {
  health: 100,
  ammo: 5,
  daysSurvived: 0,
};

let currentScene = "start";

const gameCard = document.getElementById("gameCard");
const sceneTitle = document.getElementById("sceneTitle");
const sceneDescription = document.getElementById("sceneDescription");
const choicesBox = document.getElementById("choicesBox");
const healthStat = document.getElementById("healthStat");
const ammoStat = document.getElementById("ammoStat");
const daysStat = document.getElementById("daysStat");

function loadScene(sceneId) {
  currentScene = sceneId;
  const scene = gameScenes[sceneId];

  gameCard.classList.remove("game-over", "win");

  if (scene.isGameOver) {
    gameCard.classList.add("game-over");
  }

  if (scene.isWin) {
    gameCard.classList.add("win");
  }

  sceneTitle.textContent = scene.title;

  if (scene.isWin) {
    sceneDescription.textContent = `${scene.description} You survived for ${playerStats.daysSurvived} day(s).`;
  } else {
    sceneDescription.textContent = scene.description;
  }

  updateStatsDisplay();

  if (scene.isGameOver || scene.isWin) {
    renderRestartButton();
    return;
  }

  renderChoiceButtons(scene.choices);
}

function handleChoice(choice) {
  playerStats.health += choice.healthChange;
  playerStats.ammo += choice.ammoChange;
  playerStats.daysSurvived += choice.daysChange;

  playerStats.health = Math.min(playerStats.health, 100);
  playerStats.ammo = Math.max(playerStats.ammo, 0);

  const gameOverScene = checkGameOver();

  if (gameOverScene) {
    loadScene(gameOverScene);
    return;
  }

  loadScene(choice.nextScene);
}

function updateStatsDisplay() {
  healthStat.textContent = playerStats.health;
  ammoStat.textContent = playerStats.ammo;
  daysStat.textContent = playerStats.daysSurvived;
}

function checkGameOver() {
  if (playerStats.health <= 0) {
    playerStats.health = 0;
    return "bitten";
  }

  return null;
}

function renderChoiceButtons(choices) {
  choicesBox.innerHTML = "";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-btn";

    if (choice.requiresAmmo && playerStats.ammo === 0) {
      button.disabled = true;
      button.textContent = choice.text;

      const label = document.createElement("span");
      label.className = "no-ammo-label";
      label.textContent = "No ammo";

      button.appendChild(label);
    } else {
      button.textContent = choice.text;
      button.addEventListener("click", () => {
        handleChoice(choice);
      });
    }

    choicesBox.appendChild(button);
  });
}

function renderRestartButton() {
  choicesBox.innerHTML = "";

  const restartButton = document.createElement("button");
  restartButton.className = "restart-btn";
  restartButton.type = "button";
  restartButton.textContent = "Restart Game";
  restartButton.addEventListener("click", restartGame);

  choicesBox.appendChild(restartButton);
}

function restartGame() {
  playerStats = {
    health: 100,
    ammo: 5,
    daysSurvived: 0,
  };

  currentScene = "start";
  loadScene(currentScene);
}

loadScene(currentScene);
