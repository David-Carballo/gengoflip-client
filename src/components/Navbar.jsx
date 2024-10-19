import { NavLink } from "react-router-dom";

function Navbar({setIsDarkTheme}) {
  return(
    <nav>
      <button onClick={()=> {setIsDarkTheme((current)=>!current)}}>Theme</button>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </nav>
  );
}

export default Navbar;