import {
  FilesetResolver,
  GestureRecognizer,
  DrawingUtils,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

import modelAssetPath from "./models/gesture_recognizer_2.task";

// Create task for image file processing:
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
);

const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: modelAssetPath,
    delegate: "GPU",
    numHands: 2,
  },
  //
  runningMode: "LIVE_STREAM",
  numHands: 2,
  minHandDetectionConfidence: 0.6,
});

const HandLandmarkConnections = GestureRecognizer.HAND_CONNECTIONS;
export { gestureRecognizer, DrawingUtils, HandLandmarkConnections };
