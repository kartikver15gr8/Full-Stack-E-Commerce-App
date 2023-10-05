import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import useNavigate from 'react-use-navigate';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";

import './App.css'



function App() {

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
  )
}

export default App
