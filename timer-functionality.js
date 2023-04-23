const timerDisplay = document.getElementById("timer");
const currentStepDisplay = document.getElementById("current-step");
const startStopBtn = document.getElementById('start-stop');
const resetCycleButton = document.getElementById("reset-cycle");
const resetStepButton = document.getElementById("reset-step");
const nextStepButton = document.getElementById("next-step");
const prevStepButton = document.getElementById("prev-step");

const stepNames = [
  "Time to Work",
  "Short Break",
  "Time to Work",
  "Short Break",
  "Time to Work",
  "Short Break",
  "Time to Work",
  "Short Break",
  "Long Break",
];

const stepDurations = [
  25 * 60,
  5 * 60,
  25 * 60,
  5 * 60,
  25 * 60,
  5 * 60,
  25 * 60,
  5 * 60,
  30 * 60,
];

let currentStep = 0;
let timeLeft = stepDurations[currentStep];
let timerInterval = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  currentStepDisplay.textContent = stepNames[currentStep];
}
let timerRunning = false;

startStopBtn.addEventListener('click', () => {
  timerRunning = !timerRunning;
  if (timerRunning) {
    startStopBtn.textContent = 'Stop';
    startTimer();
  } else {
    startStopBtn.textContent = 'Start';
    stopTimer();
  }
});

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        currentStep = (currentStep + 1) % stepNames.length;
        timeLeft = stepDurations[currentStep];
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetCycle() {
  currentStep = 0;
  timeLeft = stepDurations[currentStep];
  stopTimer();
  updateDisplay();
}

function resetStep() {
  timeLeft = stepDurations[currentStep];
  stopTimer();
  updateDisplay();
}

function nextStep() {
  currentStep = (currentStep + 1) % stepNames.length;
  timeLeft = stepDurations[currentStep];
  stopTimer();
  updateDisplay();
}

function prevStep() {
  currentStep = (currentStep - 1 + stepNames.length) % stepNames.length;
  timeLeft = stepDurations[currentStep];
  stopTimer();
  updateDisplay();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetCycleButton.addEventListener("click", resetCycle);
resetStepButton.addEventListener("click", resetStep);
nextStepButton.addEventListener("click", nextStep);
prevStepButton.addEventListener("click", prevStep);

updateDisplay();
