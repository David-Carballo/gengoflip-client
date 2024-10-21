import { Link } from "react-router-dom";
import Footer from "./Footer";
import '../styles/Sidebar.css'

function Sidebar({setIsDarkTheme}) {

  const handleLogout = () => {
    console.log("Log out")
  }

  return(
    <div id="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/library">Library</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/" onClick={handleLogout}>Logout</Link>
      <button onClick={()=> {setIsDarkTheme((current)=>!current)}}>Theme</button>
      <Footer/>
    </div>
  ); 
}

export default Sidebar;