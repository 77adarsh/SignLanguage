import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { postImage, controller } from "./services";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prediction = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    let streamObject = null; // Declare a mutable variable to store the stream object

    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamObject = stream; // Store the stream object in the mutable variable
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    getCameraStream();

    return () => {
      if (streamObject) {
        const tracks = streamObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      controller.abort();
    };
  }, []);

  async function processImage(context, video, canvas) {
    const res = {};
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    await canvas.toBlob(async (blob) => {
      const response = await postImage(blob);
      if (!response) return res;

      for (let i = 0; i < 3; i++) {
        const predClass = response["class"][i];
        const predProb = response["prob"][i];
        res[predClass] = (res[predClass] || 0) + predProb;
      }
      return res;
    }, "image/png");
  }

  const handleTimeChange = (event) => {
    setCurrentTime(event.target.value);
  };

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    video.currentTime = currentTime;

    // Apply constraints to the video track to set the frame rate
    const stream = video.srcObject;
    const videoTrack = stream.getVideoTracks()[0];
    await videoTrack.applyConstraints({ frameRate: 30 }); // Set the desired frame rate

    const res = await processImage(context, video, canvas);

    if (Object.keys(res).length === 0) return;
    const max = Object.keys(res).reduce((a, b) => (res[a] > res[b] ? a : b));

    prediction.current.innerText = max;
  };

  async function processImage(context, video, canvas) {
    const res = {};
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
    const response = await postImage(blob);
    if (!response) return res;

    for (let i = 0; i < 3; i++) {
      const predClass = response["class"][i];
      const predProb = response["prob"][i];
      res[predClass] = (res[predClass] || 0) + predProb;
    }
    return res;
  }

  const toggleCamera = () => {
    if (cameraActive) {
      // Turning off the camera, so stop the stream
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null; // Release the camera
    }
    setCameraActive((prevState) => !prevState);
  };

  useEffect(() => {
    let interval;
    if (cameraActive) {
      interval = setInterval(() => {
        captureImage();
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [cameraActive]);

  return (
    <div>
      <h1 className="heading">
        Welcome to the Real Time Indian Sign Language Predicter
      </h1>
      <div className="container">
        {/* Conditionally render video element based on cameraActive state */}
        {cameraActive && (
          <div className="video-container">
            <video
              ref={videoRef}
              className="video img-fluid rounded"
              autoPlay={true}
            />
            <div className="output">
              <button
                className="btn btn-primary mt-3 mx-2"
                onClick={captureImage}
              >
                Capture Image
              </button>
              <button
                className="btn btn-danger mt-3 mx-2"
                onClick={toggleCamera}
              >
                {cameraActive ? "Turn off Camera" : "Turn on Camera"}
              </button>

              <div className="predictions" ref={prediction}>
                V
              </div>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="result-container mt-3">
            <h2>Resulting Image</h2>
            <img
              className="result-image img-fluid rounded"
              src={capturedImage}
              alt="Captured Frame"
            />
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}

export default App;
// (app.js)
