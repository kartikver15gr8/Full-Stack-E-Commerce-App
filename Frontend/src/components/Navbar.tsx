import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";
// import React from "react";

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navdiv">
            <nav
                className="navbar"
                style={{ backgroundColor: "rgb(19, 25, 33)", paddingTop: "15px" }}
            >
                <ul>
                    <img
                        src="../public/ama.png"
                        alt="Amazon"
                        style={{ width: "100px" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        className="searchBox"
                    />
                    <button className="searchBtn">
                        <img src="../public/search.png" alt="" />
                    </button>
                    <button
                        className="signup"
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        signup
                    </button>
                    <button
                        className="login"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        login
                    </button>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
