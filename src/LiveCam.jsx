/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./gr.css";

const LiveCam = ({ videoRef, canvasRef, processVideo, error }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Changedd");
    const videoElement = videoRef.current;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
          videoElement.addEventListener("loadeddata", () => {
            setLoading(false);
            processVideo();
          });
        };
      });
  }, []);

  return (
    <div id="webcam-container">
      <div className="u-r-1"></div>
      <div className="u-r-2"></div>
      <div className="b-r-1"></div>
      <div className="c"></div>
      <div id="webcam">
        {loading && <div id="spinner1"></div>}
        {error && <div className="error">error</div>}
        <video id="video" autoPlay ref={videoRef}></video>
        {canvasRef && <canvas id="canvas" ref={canvasRef}></canvas>}
        <div className="pred">
          {" "}
          <span className="res">Hi</span> <span className="score">0.00</span>
        </div>
      </div>
    </div>
  );
};

export default LiveCam;
