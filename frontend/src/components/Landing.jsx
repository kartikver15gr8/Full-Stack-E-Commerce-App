import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [carousel, setCarousel] = useState("../public/carousel3.jpg");
  const [count, setCount] = useState(2);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        // height: "35vh",
      }}
    >
      <img
        src={carousel}
        alt=""
        style={{ width: "100vw", height: "50vh", zIndex: "-1" }}
      />
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
        prev
      </button>
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
        next
      </button>
    </div>
  );
}

export default Landing;
