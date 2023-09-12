import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./styles/landing.css";

function Landing() {
  const [carousel, setCarousel] = useState("../public/carousel3.jpg");
  const [count, setCount] = useState(2);

  return (
    <div
      className="mainBox"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          // height: "35vh",
        }}
      >
        <button
          style={{ zIndex: "1" }}
          onClick={() => {
            if (count > 2) {
              setCount(count - 1);
              setCarousel(`carousel${count}.jpg`);
            } else {
              setCount(6);
              setCarousel(`carousel${count}.jpg`);
            }
          }}
        >
          ◀
        </button>
        <img
          className="img"
          src={carousel}
          alt=""
          style={{
            width: "80vw",
            height: "100%",
          }}
        />

        <button
          style={{ zIndex: "1" }}
          onClick={() => {
            if (count < 6) {
              setCount(count + 1);
              setCarousel(`carousel${count}.jpg`);
            } else {
              setCount(2);
              setCarousel(`carousel${count}.jpg`);
            }
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Landing;
