const URL = "https://teachablemachine.withgoogle.com/models/v_POeE4AN/";
let model, webcam, maxPredictions;

async function initGestureControl() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  try {
   model = await tmImage.load(modelURL, metadataURL); // ✅

    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
    await webcam.setup(); // request webcam access
    await webcam.play();

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    window.requestAnimationFrame(loop);
  } catch (err) {
    alert("⚠️ Webcam access failed: " + err.message);
    console.error("Webcam init error:", err);
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const predictions = await model.predict(webcam.canvas);
  const topGesture = predictions.reduce((max, p) => p.probability > max.probability ? p : max);

  if (topGesture.probability > 0.95) {
    switch (topGesture.className) {
      case "Thumbs Up":
        startTimer(60); break;
      case "Thumbs Down":
        stopTimer(); break;
    }
  }
}

// ✅ Auto-start on page load
window.addEventListener("DOMContentLoaded", initGestureControl);
