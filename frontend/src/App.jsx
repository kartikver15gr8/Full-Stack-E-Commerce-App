import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const navigate = { useNavigate };
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
