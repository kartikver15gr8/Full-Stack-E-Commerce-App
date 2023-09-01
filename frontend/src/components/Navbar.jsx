import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";

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
          <input type="text" name="search" className="searchBox" />
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

// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import "./styles/navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   return (
//     <nav className="navbar">
//       <h1
//         onClick={() => {
//           navigate("/");
//         }}
//       >
//         Coursera
//       </h1>
//       <div className="btn">
//         {/* <Button variant="contained">Admin</Button>
//         <Button variant="outlined">User</Button> */}

//         <Button
//           variant="contained"
//           onClick={() => {
//             navigate("/signup");
//           }}
//         >
//           signup
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => {
//             navigate("/login");
//           }}
//         >
//           login
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => {
//             navigate("/addCourse");
//           }}
//         >
//           Add
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => {
//             navigate("/getCourse");
//           }}
//         >
//           Get
//         </Button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
