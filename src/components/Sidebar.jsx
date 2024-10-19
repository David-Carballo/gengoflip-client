import { Link } from "react-router-dom";
import Footer from "./Footer";
import '../styles/Sidebar.css'

function Sidebar({setIsDarkTheme}) {
  return(
    <div id="sidebar">
      <Link to="/">Dashboard</Link>
      <Link to="/">Library</Link>
      <Link to="/">Profile</Link>
      <Link to="/">Logout</Link>
      <button onClick={()=> {setIsDarkTheme((current)=>!current)}}>Theme</button>
      <Footer/>
    </div>
  ); 
}

export default Sidebar;