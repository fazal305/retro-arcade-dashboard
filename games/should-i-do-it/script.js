const questionInput = document.getElementById("questionInput");
const decideBtn = document.getElementById("decideBtn");
const resultBox = document.getElementById("resultBox");
const askAgainBtn = document.getElementById("askAgainBtn");
const whatsappShareBtn = document.getElementById("whatsappShareBtn");
const actionButtons = document.querySelector(".action-buttons");
const historyList = document.getElementById("historyList");

let lastQuestion = "";
let history = [];

const responses = [
  { text: "YES", color: "#00ff99" },
  { text: "NO", color: "#ff4d6d" },
  { text: "ABSOLUTELY NOT", color: "#ff2e63" },
  { text: "ASK YOUR MOTHER", color: "#ffd166" },
  { text: "TRY AGAIN AFTER CHAI", color: "#f4a261" },
  { text: "THE UNIVERSE IS UNSURE", color: "#70d6ff" },
  { text: "BHAI SERIOUSLY?", color: "#c77dff" },
  { text: "FLIP A COIN INSTEAD", color: "#72efdd" },
  { text: "MAYBE AFTER A NAP", color: "#a29bfe" },
  { text: "PRAY FIRST", color: "#f9c74f" },
];

function playPopSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 500;
  gainNode.gain.value = 0.08;

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    audioContext.close();
  }, 80);
}

function vibratePhone() {
  if (navigator.vibrate) {
    navigator.vibrate(80);
  }
}

function updateWhatsappLink(question, answer) {
  const message = `I asked: "${question}"\nThe answer was: ${answer}\n\nTry this decision generator.`;

  whatsappShareBtn.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function updateHistory(question, answer) {
  history.unshift({
    question,
    answer,
  });

  history = history.slice(0, 5);
  historyList.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");
    const questionLine = document.createElement("strong");
    const answerLine = document.createElement("strong");

    questionLine.textContent = "Q:";
    answerLine.textContent = "A:";

    li.appendChild(questionLine);
    li.append(` ${item.question}`);
    li.appendChild(document.createElement("br"));
    li.appendChild(answerLine);
    li.append(` ${item.answer}`);

    historyList.appendChild(li);
  });
}

function runResultAnimation() {
  const animations = ["bounce", "spin", "shake", "fade"];
  const randomAnimation =
    animations[Math.floor(Math.random() * animations.length)];

  resultBox.classList.remove("bounce", "spin", "shake", "fade");

  setTimeout(() => {
    resultBox.classList.add(randomAnimation);
  }, 10);
}

function showRandomAnswer(question) {
  const randomIndex = Math.floor(Math.random() * responses.length);
  const selectedResponse = responses[randomIndex];

  resultBox.textContent = selectedResponse.text;
  resultBox.style.color = selectedResponse.color;
  actionButtons.style.display = "grid";

  updateWhatsappLink(question, selectedResponse.text);
  updateHistory(question, selectedResponse.text);
  playPopSound();
  vibratePhone();
  runResultAnimation();
}

function generateDecision() {
  const question = questionInput.value.trim();

  if (question === "") {
    resultBox.textContent = "Ask something first.";
    resultBox.style.color = "#ffffff";
    questionInput.focus();
    return;
  }

  lastQuestion = question;
  showRandomAnswer(question);
}

function askAgain() {
  if (lastQuestion === "") {
    resultBox.textContent = "Ask one question first.";
    resultBox.style.color = "#ffffff";
    questionInput.focus();
    return;
  }

  showRandomAnswer(lastQuestion);
}

decideBtn.addEventListener("click", generateDecision);
askAgainBtn.addEventListener("click", askAgain);

questionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateDecision();
  }
});
