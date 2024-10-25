import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'
import logo from "/logo.png"

function Navbar() {
  return(
    <nav id="navbar">
      <div className="flex-r g20">
        <img src={logo} alt="logo web" />
        <h3>GengoFlip</h3>
      </div>
      <div id="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;