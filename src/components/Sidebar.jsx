import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import '../styles/Sidebar.css'
import homeIcon from '../assets/home.svg'
import libraryIcon from '../assets/library.svg'
import profileIcon from '../assets/profile.svg'
import logoutIcon from '../assets/log-out.svg'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Sidebar() {
  const { authenticateUser} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    
    localStorage.removeItem("authToken");
    try {
      await authenticateUser();
      
      window.location.href=("/")
    } 
    catch (error) {
      navigate("/error")
    }
  }

  return(
    <div id="sidebar">
      <div id="sidebar-icons">
        <Link to="/profile">
          <img src={profileIcon} alt="profile icon" />
          <p className="mobile">Profile</p>
        </Link>
        <Link to="/dashboard">
          <img src={homeIcon} alt="dashboard icon" />
          <p className="mobile">Dashboard</p>
        </Link>
        <Link to="/library">
          <img src={libraryIcon} alt="library icon" />
          <p className="mobile">Library</p>
        </Link>
        <Link to="/" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout icon" />
          <p className="mobile">Logout</p>
        </Link>
      </div>

    </div>
  ); 
}

export default Sidebar;