import React, { useEffect, useState } from "react";
import {
  gestureRecognizer,
  DrawingUtils,
  HandLandmarkConnections,
} from "./gesture.js";
import { formatScore } from "./utils.js";

import { useRef } from "react";
import "./gr.css";
import LiveCam from "./LiveCam.jsx";

const GestureRecognizer = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [lastVideoTime, setLastVideoTime] = useState(-1);

  const processVideo = async () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const webcam = document.getElementById("webcam");
    const videoWidth = getComputedStyle(webcam).width;
    const videoHeight = getComputedStyle(webcam).height;
    const canvasCtx = canvasElement.getContext("2d");
    let results = null;
    await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    canvasElement.style.height = videoHeight;
    videoElement.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    videoElement.style.width = videoWidth;

    function renderLoop() {
      let nowInMs = Date.now();
      if (videoElement.currentTime !== lastVideoTime) {
        setLastVideoTime(videoElement.currentTime);
        results = gestureRecognizer.recognizeForVideo(videoElement, nowInMs);
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      const drawingUtils = new DrawingUtils(canvasCtx);

      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(landmarks, HandLandmarkConnections, {
            color: "red",
            lineWidth: 2,
          });
          drawingUtils.drawLandmarks(landmarks, {
            color: "white",
            radius: 1,
          });
        }
      }
      canvasCtx.restore();
      if (
        results.gestures &&
        results.gestures.length > 0 &&
        results.gestures[0][0].categoryName != ""
      ) {
        document.querySelector(".res").innerHTML =
          results.gestures[0][0].categoryName;
        document.querySelector(".score").innerHTML = formatScore(
          results.gestures[0][0].score
        );
      }
      requestAnimationFrame(() => {
        renderLoop();
      });
    }
    renderLoop();
  };


  return (
    <LiveCam
      videoRef={videoRef}
      canvasRef={canvasRef}
      processVideo={processVideo}
    />
  );
};

export default GestureRecognizer;
