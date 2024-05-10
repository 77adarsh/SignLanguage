import { useState } from "react";
import VideoCapture from "./VideoCapture";
import { useSpring, animated } from "@react-spring/web";
import GestureRecogniser from "./GestureRecogniser";
import LiveCam from "./LiveCam";

function App() {
  const [showVideoCapture, setShowVideoCapture] = useState(false);

  const handleClick = () => {
    setShowVideoCapture(true);
  };

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  };

  const titleStyle = {
    color: "#007BFF",
    textAlign: "center",
  };

  return <GestureRecogniser />;
  // return (
  //   <animated.div style={fade}>
  //     {showVideoCapture ? (
  //       <GestureRecogniser/>
  //     ) : (
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           height: "100vh",
  //         }}
  //       >
  //         <h1 style={titleStyle}>
  //           Welcome to the Real Time Indian Sign Language Predicter
  //         </h1>
  //         <button style={buttonStyle} onClick={handleClick}>
  //           Start Sign Language Prediction
  //         </button>
  //       </div>
  //     )}
  //   </animated.div>
  // );
}

export default App;
