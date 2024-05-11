import React, { useEffect } from "react";
import "./gr.css";

const LiveCam = ({ videoRef, canvasRef, processVideo }) => {
  useEffect(() => {
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
          videoElement.addEventListener("loadeddata", processVideo);
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