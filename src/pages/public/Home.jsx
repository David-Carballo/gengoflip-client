import { Link, useNavigate } from "react-router-dom";
import '../../styles/Home.css'
import bgImg from "../../assets/bg-flashcards.png"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";


function Home() {
  const navigate = useNavigate();
  const {isLoggedIn} = useContext(AuthContext);

  useEffect(()=>{
    if(isLoggedIn) navigate("/dashboard");  
  },[])

  return(
    <div id="home">
      <div className="flex-c g50 center">
        <h1>Learn languages with our personalized flashcards</h1>
        <Link to="/signup">Get started</Link>
        <div className="flex-c g20 align-start">
          <p>Create, organize, and review your personalized language flashcards</p>
          <p>Practice vocabulary and grammar easily and effectively</p>
          <p>Ideal for any learning level</p>
        </div>
      </div>
      <div className="center">
        <img src={bgImg} alt="bg-flashcards"/>
      </div>
    </div>
  );
}

export default Home;