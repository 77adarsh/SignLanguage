import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { postImage, controller, testServer } from "./services";
import LiveCam from "./LiveCam";

function VideoCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));

  function recallCaptureAfter1s() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        captureImage();
        resolve();
      }, 100);
    });
  }

  async function processImage(context, video, canvas) {
    const prediction = document.querySelector(".res");
    const score = document.querySelector(".score");

    const res = {};
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    await canvas.toBlob(async (blob) => {
      try {
        const response = await postImage(blob);
        if (!response || response.statuscode == 400) return res;
        for (let i = 0; i < 3; i++) {
          const predClass = response["class"][i];
          const predProb = response["prob"][i];
          res[predClass] = (res[predClass] || 0) + predProb;
        }
        if (res) {
          if (Object.keys(res).length === 0) return;
          const max = Object.keys(res).reduce((a, b) =>
            res[a] > res[b] ? a : b
          );
          if (res[max] > 0.4) {
            prediction.innerText = max;
            score.innerText = res[max];
          }
        }

        return res;
      } catch (error) {
        console.log(error);
        return;
      }
    }, "image/png");
  }

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    video.currentTime = new Date();

    // Apply constraints to the video track to set the frame rate
    const stream = video.srcObject;
    const videoTrack = stream.getVideoTracks()[0];
    await videoTrack.applyConstraints({ frameRate: 30 }); // Set the desired frame rate

    await processImage(context, video, canvas);

    await recallCaptureAfter1s();
  };

  const connectServer = async () => {
    console.log('connect called');
    const testConnection = await testServer();
    if (testConnection) {
      console.log("Connected to server");
      captureImage();
    } else {
      console.log("cannot connect to server");
      controller.abort();
    }
  };

  return <LiveCam videoRef={videoRef} processVideo={connectServer} />;
}

export default VideoCapture;
// (app.js)
