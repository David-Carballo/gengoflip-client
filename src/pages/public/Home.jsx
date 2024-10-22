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
      <div className="flex-c g40 center">
        <h1>Aprende idiomas con nuestras flashcards personalizadas</h1>
        <Link to="/signup">Get started</Link>
        <div className="flex-c g20 align-start">
          <p>Crea, organiza y revisa tus flashcards de idiomas personalizadas</p>
          <p>Practica vocabulario y gramática de forma fácil y efectiva</p>
          <p>Ideal para cualquier nivel de aprendizaje.</p>
        </div>
      </div>
      <div className="center">
        <img src={bgImg} alt="bg-flashcards"/>
      </div>
    </div>
  );
}

export default Home;