let timerInterval;
let secondsRemaining = 60;
let isRunning = false;

function startTimer(duration = 60) {
  if (isRunning) return;
  clearInterval(timerInterval);
  secondsRemaining = duration;
  updateDisplay();
  isRunning = true;

  speak("The countdown begins, mortal!");

  timerInterval = setInterval(() => {
    secondsRemaining--;
    updateDisplay();
    if (secondsRemaining <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      speak("Time’s up, mortal!");
    }
  }, 1000);
}

function stopTimer() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
  speak("Stopping the countdown. Are you scared?");
}

function resetTimer() {
  clearInterval(timerInterval);
  secondsRemaining = 60;
  isRunning = false;
  updateDisplay();
  speak("Back to zero. Try harder!");
}

function updateDisplay() {
  const display = document.getElementById("display");
  const minutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
  const seconds = String(secondsRemaining % 60).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}`;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 0.8;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

document.addEventListener("DOMContentLoaded", updateDisplay);
