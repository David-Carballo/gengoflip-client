import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import '../styles/Sidebar.css'
import homeIcon from '../assets/home.svg'
import libraryIcon from '../assets/library.svg'
import profileIcon from '../assets/profile.svg'
import logoutIcon from '../assets/log-out.svg'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Sidebar({setIsDarkTheme}) {
  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/login")
  }

  return(
    <div id="sidebar">
      <div id="sidebar-icons">
        <Link to="/profile">
          <img src={profileIcon} alt="profile icon" />
          <p>Profile</p>
        </Link>
        <Link to="/dashboard">
          <img src={homeIcon} alt="dashboard icon" />
          <p>Dashboard</p>
        </Link>
        <Link to="/library">
          <img src={libraryIcon} alt="library icon" />
          <p>Library</p>
        </Link>
        <Link to="/" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout icon" />
          <p>Logout</p>
        </Link>
      </div>
      <div id="sidebar-footer">
        {/* <button onClick={()=> {setIsDarkTheme((current)=>!current)}}><img src={libraryIcon} alt="home icon" /></button> */}
        {/* <Footer/> */}
      </div>

    </div>
  ); 
}

export default Sidebar;