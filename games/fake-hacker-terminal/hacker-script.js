const terminalBody = document.getElementById("terminalBody");
const terminalWindow = document.querySelector(".terminal-window");
const soundBtn = document.getElementById("soundBtn");

let currentCommandIndex = 0;
let audioEnabled = false;

const commandList = [
  {
    command: "boot --profile cinematic-demo",
    response: "Demo shell initialized. All activity is simulated.",
    progress: true,
    glitch: false,
  },
  {
    command: "scan-ui --target local-interface",
    response: "Interface scan complete. Neon density: excessive.",
    progress: true,
    glitch: false,
  },
  {
    command: "connect --node fazal-labs-fun-lab",
    response: "Connection established to fictional demo node.",
    progress: false,
    glitch: true,
  },
  {
    command: "render --effect crt-scanlines",
    response: "CRT overlay active. Terminal drama increased by 87%.",
    progress: true,
    glitch: false,
  },
  {
    command: "analyze --repository fake-hacker-terminal",
    response: "Static browser project detected. No real commands executed.",
    progress: true,
    glitch: false,
  },
  {
    command: "compile --vibes green-on-black",
    response: "Visual atmosphere compiled successfully.",
    progress: true,
    glitch: true,
  },
  {
    command: "audit --safety-mode enabled",
    response: "Safety check passed. This is a harmless simulation.",
    progress: false,
    glitch: false,
  },
  {
    command: "sync --portfolio fazal-labs",
    response: "Project tagged for Fun Lab mini-project collection.",
    progress: true,
    glitch: false,
  },
  {
    command: "git status --cinematic",
    response: "Working tree clean. Suspense level remains high.",
    progress: false,
    glitch: true,
  },
  {
    command: "reboot --loop terminal-sequence",
    response: "Loop prepared. Replaying simulated terminal sequence.",
    progress: true,
    glitch: true,
  },
];

function playBeepSound(frequency = 420, duration = 24) {
  if (!audioEnabled) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "square";
  gainNode.gain.value = 0.025;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    audioContext.close();
  }, duration);
}

function autoScroll() {
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function triggerGlitchEffect() {
  terminalWindow.classList.add("glitch-screen");
  playBeepSound(90, 120);

  setTimeout(() => {
    terminalWindow.classList.remove("glitch-screen");
  }, 800);
}

function typewriterEffect(text, element, speed, callback) {
  let characterIndex = 0;

  const typingInterval = setInterval(() => {
    element.textContent = text.substring(0, characterIndex + 1);

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "|";
    element.appendChild(cursor);

    playBeepSound(420, 18);
    characterIndex += 1;
    autoScroll();

    if (characterIndex === text.length) {
      clearInterval(typingInterval);
      element.textContent = text;

      if (callback) {
        callback();
      }
    }
  }, speed);
}

function showProgressBar(callback) {
  const progressLine = document.createElement("div");
  progressLine.classList.add("progress-line");
  terminalBody.appendChild(progressLine);

  let progressValue = 0;

  const progressInterval = setInterval(() => {
    progressValue += 10;

    const filledBlocks = "#".repeat(progressValue / 10);
    const emptyBlocks = "-".repeat(10 - progressValue / 10);

    progressLine.textContent = `Processing [${filledBlocks}${emptyBlocks}] ${progressValue}%`;
    playBeepSound(260, 24);
    autoScroll();

    if (progressValue >= 100) {
      clearInterval(progressInterval);

      setTimeout(() => {
        if (callback) {
          callback();
        }
      }, 500);
    }
  }, 120);
}

function showResponse(currentCommand) {
  const responseLine = document.createElement("div");
  responseLine.classList.add("response-line");

  if (currentCommand.response.includes("Safety")) {
    responseLine.classList.add("warning-line");
  }

  terminalBody.appendChild(responseLine);

  typewriterEffect(currentCommand.response, responseLine, 18, () => {
    if (currentCommand.glitch) {
      triggerGlitchEffect();
    }

    setTimeout(() => {
      currentCommandIndex += 1;
      runNextCommand();
    }, 900);
  });
}

function prepareResponse(currentCommand) {
  if (currentCommand.progress) {
    showProgressBar(() => {
      showResponse(currentCommand);
    });
  } else {
    showResponse(currentCommand);
  }
}

function restartSequence() {
  const dramaticMessage = document.createElement("div");
  dramaticMessage.classList.add("response-line", "warning-line");
  terminalBody.appendChild(dramaticMessage);

  triggerGlitchEffect();

  typewriterEffect(
    "SYSTEM LOOP COMPLETE... RESETTING CINEMATIC TERMINAL...",
    dramaticMessage,
    25,
    () => {
      setTimeout(() => {
        currentCommandIndex = 0;
        terminalBody.innerHTML = "";
        terminalBody.appendChild(soundBtn);
        runNextCommand();
      }, 2800);
    },
  );
}

function runNextCommand() {
  if (currentCommandIndex >= commandList.length) {
    restartSequence();
    return;
  }

  const currentCommand = commandList[currentCommandIndex];
  const commandLine = document.createElement("div");
  const prefix = document.createElement("span");
  const commandText = document.createElement("span");

  commandLine.classList.add("command-line");
  prefix.classList.add("prefix");
  prefix.textContent = "[demo@fazal-labs ~]$ ";

  commandLine.appendChild(prefix);
  commandLine.appendChild(commandText);
  terminalBody.appendChild(commandLine);

  typewriterEffect(currentCommand.command, commandText, 35, () => {
    setTimeout(() => {
      prepareResponse(currentCommand);
    }, 700);
  });
}

soundBtn.addEventListener("click", () => {
  audioEnabled = !audioEnabled;
  soundBtn.textContent = audioEnabled ? "Audio Enabled" : "Enable Audio";

  if (audioEnabled) {
    playBeepSound(520, 80);
  }
});

runNextCommand();
