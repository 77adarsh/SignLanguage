import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import GestureRecognizer from "./GestureRecogniser.jsx";
import VideoCapture from "./VideoCapture.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mediapipe" element={<GestureRecognizer />} />
        <Route path="/resnet" element={<VideoCapture />} />
      </Routes>
    </Router>
  );
}

export default App;
