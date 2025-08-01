let timerInterval;
let secondsRemaining = 0;

function startTimer(duration = 60) {
  clearInterval(timerInterval);
  secondsRemaining = duration;
  updateDisplay();
  timerInterval = setInterval(() => {
    secondsRemaining--;
    updateDisplay();
    if (secondsRemaining <= 0) {
      clearInterval(timerInterval);
      speak("Time’s up, mortal!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  speak("Stopping the countdown, are you scared?");
}

function resetTimer() {
  clearInterval(timerInterval);
  secondsRemaining = 0;
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
  speechSynthesis.speak(utterance);
}
