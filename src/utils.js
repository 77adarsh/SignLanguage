export function captureCurrentFrame(videoElement) {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  // Get the context of the canvas
  const ctx = canvas.getContext("2d");

  // Draw the current frame of the video onto the canvas
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Convert the canvas to a data URL (base64 encoded image)
  return canvas.toDataURL("image/png");
}

export function formatScore(score) {
  return Math.floor(parseFloat(score) * 10000) / 100 + "%";
}
