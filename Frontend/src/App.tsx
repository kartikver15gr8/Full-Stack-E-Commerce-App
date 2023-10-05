import { RecoilRoot, useSetRecoilState } from "recoil"
import { userState } from "./store/atoms/user.ts"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios'
import { BASE_URL } from "./config.tsx"

import Navbar from "./components/Navbar"
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";

import './App.css'

function App() {

  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Navbar />
          <InitUser />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  )
}


function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.email) {
        setUser({
          isLoading: false,
          userEmail: response.data.email,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <></>;
}
export default App;
