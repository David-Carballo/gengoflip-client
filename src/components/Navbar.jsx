import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'

function Navbar() {
  return(
    <nav id="navbar">
      <h3>GengoFlip</h3>
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