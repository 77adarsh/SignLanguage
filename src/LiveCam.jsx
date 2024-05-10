import React, { useEffect } from "react";
import "./gr.css";

const LiveCam = ({ videoRef, canvasRef }) => {
  useEffect(() => {
    videoRef.current.width = canvasRef.current.width;
  }, []);
  return (
    <div id="webcam-container">
      <div className="u-r-1"></div>
      <div className="u-r-2"></div>
      <div className="b-r-1"></div>
      <div className="c"></div>
      <div id="webcam">
        <video id="video" autoPlay ref={videoRef}></video>
        <canvas id="canvas" ref={canvasRef}></canvas>
        <div className="pred">
          {" "}
          <span className="res">Hi</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default LiveCam;
