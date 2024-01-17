import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail"
// import React from "react";

function Navbar() {
    const navigate = useNavigate();

    const userEmail = useRecoilValue(userEmailState)
    const setUser = useSetRecoilState(userState)

    if (userEmail) {
        return (
            <div className="navdiv">
                <nav
                    className="navbar"
                    style={{ backgroundColor: "rgb(19, 25, 33)", paddingTop: "15px" }}
                >
                    <ul>
                        <img
                            src="../ama.png"
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
                            <img src="../search.png" alt="" />
                        </button>
                        {/* <button
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
                        </button> */}
                        <div className="user" style={{ marginRight: '15px' }}>
                            <p style={{ color: 'whitesmoke', fontWeight: 'bolder', fontFamily: 'monospace', fontSize: 'larger' }}>Hi {userEmail.split('@')[0]}👋</p>
                        </div>
                        <button
                            className="logout"
                            onClick={() => {
                                setUser({
                                    isLoading: false,
                                    userEmail: null
                                })
                                localStorage.setItem("token", "");
                                navigate('/')
                            }}
                        >Logout</button>
                    </ul>
                </nav>
            </div >
        )
    }

    else {


        return (
            <div className="navdiv">
                <nav
                    className="navbar"
                    style={{ backgroundColor: "rgb(19, 25, 33)", paddingTop: "15px" }}
                >
                    <ul>
                        <img
                            src="../ama.png"
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
                            <img src="../search.png" alt="" />
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
}

export default Navbar;
