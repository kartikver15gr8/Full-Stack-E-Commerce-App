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
      <div
        className="products"
        style={{
          display: "flex",
          border: "1px solid black",
          height: "40vh",
          width: "90vw",
          padding: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div
          className="deals"
          style={{
            border: "1px solid black",
            height: "90%",
            width: "20vw",
            margin: "10px",
          }}
        ></div>
        <div
          className="deals"
          style={{
            border: "1px solid black",
            height: "90%",
            width: "20vw",
            margin: "10px",
          }}
        ></div>
        <div
          className="deals"
          style={{
            border: "1px solid black",
            height: "90%",
            width: "20vw",
            margin: "10px",
          }}
        ></div>
        <div
          className="deals"
          style={{
            border: "1px solid black",
            height: "90%",
            width: "20vw",
            margin: "10px",
          }}
        ></div>
      </div>
      <div
        className="section"
        style={{
          display: "flex",
          height: "30vh",
          width: "90vw",
          border: "1px solid blue",
          marginTop: "20px",
        }}
      >
        <div
          className="cards"
          style={{
            border: "1px solid orange",
            width: "60vw",
            height: "90%",
            margin: "10px",
          }}
        ></div>
        <div
          className="cards"
          style={{
            border: "1px solid orange",
            width: "30vw",
            height: "90%",
            margin: "10px",
          }}
        ></div>
        <div
          className="cards"
          style={{
            border: "1px solid orange",
            width: "30vw",
            height: "90%",
            margin: "10px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Landing;
