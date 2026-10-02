const userInput = document.getElementById("userInput");
const roastBtn = document.getElementById("roastBtn");
const againBtn = document.getElementById("againBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const roastOutput = document.getElementById("roastOutput");
const categoryLabel = document.getElementById("categoryLabel");

let lastUserInput = "";
let currentRoastText = "";

const roastCategories = {
  css: [
    "Your CSS layout is held together by margin-top: 200px and confidence.",
    "You don't fix CSS bugs. You just add another div and hope.",
    "Your flexbox looks like it was arranged by a confused committee.",
    "Your website is responsive only because it responds badly on every screen.",
  ],

  javascript: [
    "Your JavaScript has more undefined moments than your life plans.",
    "You use console.log like it is a full debugging department.",
    "Your code has async issues and emotional damage.",
    "You wrote one function and somehow created a multiverse bug.",
  ],

  python: [
    "You write Python because semicolons hurt your feelings.",
    "Your Python code is readable, but the logic still needs therapy.",
    "You imported 12 libraries just to print hello world.",
    "Your indentation has more discipline than your project folder.",
  ],

  beginner: [
    "You are not a bad developer. You are just in your character development arc.",
    "You named a variable data2 and thought nobody would notice.",
    "Your first bug was believing the tutorial would work exactly the same.",
    "You do not debug yet. You just stare at the screen with betrayal.",
  ],

  git: [
    "You use Git like a suspense movie: commit, panic, push, regret.",
    "A developer who still pushes to main directly? Brave. Dangerous, but brave.",
    "Your commit history looks like a ransom note.",
    "You do not use Git branches. You use hope.",
  ],

  wordpress: [
    "You use WordPress and call yourself full-stack. Bold strategy.",
    "Your plugin folder has more drama than a family WhatsApp group.",
    "You installed 18 plugins and blamed the hosting.",
    "Your website loads slower than motivation on Monday morning.",
  ],

  react: [
    "You created one button and somehow needed five components.",
    "Your React state changes more often than your career plan.",
    "You use useEffect like a magic spell.",
    "Your props are drilling deeper than your documentation.",
  ],

  vscode: [
    "Your VS Code has 47 extensions and you still cannot find the error.",
    "You changed the theme and called it productivity.",
    "Your editor looks professional. Your code still needs supervision.",
    "You installed Prettier because even your code was embarrassed.",
  ],

  firebase: [
    "You connected Firebase once and immediately felt like a backend engineer.",
    "Your Firestore rules are either too strict or basically a public invitation.",
    "You said real-time database and your project started sweating.",
    "Your app stores data in Firebase and anxiety in your heart.",
  ],

  stackoverflow: [
    "You have been using Stack Overflow for years and still cannot center a div.",
    "Your coding style is 20% logic and 80% copied answer from 2016.",
    "You do not search errors. You negotiate with Stack Overflow.",
    "Your browser history knows your bugs better than you do.",
  ],

  pakistani: [
    "Your code runs only after chai, dua, and three refreshes.",
    "This project has full Karachi load-shedding energy.",
    "Your bug said kal ana and disappeared from the console.",
    "You debug like a Pakistani student before submission: panic first, logic later.",
  ],

  general: [
    "A developer who uses {input} and still pushes broken code? Legendary chaos.",
    "You said {input} like that explains the bugs.",
    "Your code does not crash. It performs a dramatic exit.",
    "Your project structure looks like it was organized during a deadline.",
    "You do not write bugs. You create surprise features.",
    "Your README says simple project. The code says incident report.",
    "You debug by changing random lines until the error gets tired.",
    "Your portfolio project has main character energy and side quest bugs.",
  ],
};

const categoryNames = {
  css: "CSS roast detected",
  javascript: "JavaScript chaos detected",
  python: "Python roast detected",
  beginner: "Beginner arc detected",
  git: "Git disaster detected",
  wordpress: "WordPress plugin chaos detected",
  react: "React component drama detected",
  vscode: "VS Code extension addiction detected",
  firebase: "Firebase backend confidence detected",
  stackoverflow: "Stack Overflow dependency detected",
  pakistani: "Pakistani dev energy detected",
  general: "General developer chaos detected",
};

function getRoastCategory(inputText) {
  const lowerCaseInput = inputText.toLowerCase();

  if (
    lowerCaseInput.includes("css") ||
    lowerCaseInput.includes("html") ||
    lowerCaseInput.includes("layout") ||
    lowerCaseInput.includes("bootstrap")
  ) {
    return "css";
  }

  if (
    lowerCaseInput.includes("javascript") ||
    lowerCaseInput.includes("js") ||
    lowerCaseInput.includes("node")
  ) {
    return "javascript";
  }

  if (
    lowerCaseInput.includes("python") ||
    lowerCaseInput.includes("django") ||
    lowerCaseInput.includes("flask")
  ) {
    return "python";
  }

  if (
    lowerCaseInput.includes("beginner") ||
    lowerCaseInput.includes("junior") ||
    lowerCaseInput.includes("student") ||
    lowerCaseInput.includes("new")
  ) {
    return "beginner";
  }

  if (
    lowerCaseInput.includes("git") ||
    lowerCaseInput.includes("github") ||
    lowerCaseInput.includes("commit") ||
    lowerCaseInput.includes("push")
  ) {
    return "git";
  }

  if (
    lowerCaseInput.includes("wordpress") ||
    lowerCaseInput.includes("elementor")
  ) {
    return "wordpress";
  }

  if (lowerCaseInput.includes("react") || lowerCaseInput.includes("next")) {
    return "react";
  }

  if (
    lowerCaseInput.includes("vs code") ||
    lowerCaseInput.includes("vscode") ||
    lowerCaseInput.includes("editor")
  ) {
    return "vscode";
  }

  if (
    lowerCaseInput.includes("firebase") ||
    lowerCaseInput.includes("firestore")
  ) {
    return "firebase";
  }

  if (
    lowerCaseInput.includes("stackoverflow") ||
    lowerCaseInput.includes("stack overflow")
  ) {
    return "stackoverflow";
  }

  if (
    lowerCaseInput.includes("pakistan") ||
    lowerCaseInput.includes("karachi") ||
    lowerCaseInput.includes("chai") ||
    lowerCaseInput.includes("dua")
  ) {
    return "pakistani";
  }

  return "general";
}

function getRandomRoast(roastList) {
  const randomIndex = Math.floor(Math.random() * roastList.length);
  return roastList[randomIndex];
}

function animateRoastText() {
  roastOutput.classList.remove("roast-pop");
  void roastOutput.offsetWidth;
  roastOutput.classList.add("roast-pop");
}

function shakeInputBox() {
  userInput.classList.remove("shake");
  void userInput.offsetWidth;
  userInput.classList.add("shake");
}

function playRoastSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    70,
    audioContext.currentTime + 0.16,
  );

  gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.16,
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.16);

  setTimeout(() => {
    audioContext.close();
  }, 220);
}

function vibrateDevice() {
  if (navigator.vibrate) {
    navigator.vibrate([60, 40, 80]);
  }
}

function triggerRoastEffects() {
  playRoastSound();
  vibrateDevice();
}

function showRoast() {
  const typedInput = userInput.value.trim();

  if (typedInput === "" && lastUserInput === "") {
    roastOutput.textContent =
      "Type something first. I cannot roast invisible code.";
    categoryLabel.textContent = "No roast material found...";
    currentRoastText = "";
    copyBtn.textContent = "Copy Roast";

    shakeInputBox();
    animateRoastText();
    triggerRoastEffects();

    return;
  }

  if (typedInput !== "") {
    lastUserInput = typedInput;
  }

  const selectedCategory = getRoastCategory(lastUserInput);
  const selectedRoast = getRandomRoast(roastCategories[selectedCategory]);
  const finalRoast = selectedRoast.replace("{input}", lastUserInput);

  currentRoastText = finalRoast;
  roastOutput.textContent = finalRoast;
  categoryLabel.textContent = categoryNames[selectedCategory];

  animateRoastText();
  triggerRoastEffects();

  againBtn.classList.add("visible");
  copyBtn.classList.add("visible");
  copyBtn.textContent = "Copy Roast";
}

function clearRoast() {
  userInput.value = "";
  lastUserInput = "";
  currentRoastText = "";

  roastOutput.textContent = "Your roast will appear here.";
  categoryLabel.textContent = "Waiting for roast material...";

  againBtn.classList.remove("visible");
  copyBtn.classList.remove("visible");
  copyBtn.textContent = "Copy Roast";

  userInput.focus();
}

async function copyRoast() {
  if (currentRoastText === "") {
    roastOutput.textContent = "Generate a roast first, copy master.";
    animateRoastText();
    triggerRoastEffects();
    return;
  }

  try {
    await navigator.clipboard.writeText(currentRoastText);
    copyBtn.textContent = "Copied";
  } catch (error) {
    copyBtn.textContent = "Copy failed";
  }

  setTimeout(() => {
    copyBtn.textContent = "Copy Roast";
  }, 1400);
}

roastBtn.addEventListener("click", showRoast);
againBtn.addEventListener("click", showRoast);
clearBtn.addEventListener("click", clearRoast);
copyBtn.addEventListener("click", copyRoast);

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showRoast();
  }
});
