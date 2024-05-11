import { Link } from "react-router-dom";

export function Home() {
  const buttonStyle = {
    padding: "15px 30px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "2px solid #4CAF50",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "20px",
    marginRight: "20px",
    transition: "background-color 0.3s, color 0.3s",
    textDecoration: "none",
    display: "inline-block",
  };

  const titleStyle = {
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "36px",
  };

  const explanationStyle = {
    fontSize: "18px",
    color: "#666",
    lineHeight: "1.6",
    textAlign: "left",
    maxWidth: "800px",
    margin: "0 auto",
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={titleStyle}>Welcome to ISL translator App</h1>
      <div style={{ marginBottom: "40px" }}>
        <Link to="/mediapipe" style={buttonStyle}>
          Try Gesture Recognizer with Media Pipe
        </Link>
        <Link to="/resnet" style={buttonStyle}>
          Explore Resnet Fingerspell Classifier
        </Link>
      </div>
      <div style={explanationStyle}>
        <p>
          Indian Sign Language (ISL) is a visual-gestural language used by
          millions of Deaf and Hard of Hearing people in India. This app helps
          bridge the communication gap by recognizing gestures in ISL and
          translating them into text or speech.
        </p>
        <p>
          The Gesture Recognizer, powered by MediaPipe, detects and interprets
          hand gestures, enabling users to communicate using ISL more
          effectively.
        </p>
        <p>
          The ResNet Fingerspell Classifier recognizes finger-spelled alphabets
          and converts them into text, enhancing the accuracy and efficiency of
          ISL translation.
        </p>
      </div>
    </div>
  );
}
