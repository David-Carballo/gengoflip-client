import { Link, useNavigate } from "react-router-dom";
import '../../styles/Home.css'
import bgImg from "../../assets/folder.svg"
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
      <h1>Aprende idiomas con nuestras flashcards personalizadas</h1>
      {/* <img src={bgImg} alt="background image"/>  */}
      <Link to="/signup">Get started</Link>
      <p>Crea, organiza y revisa tus flashcards de idiomas personalizadas."</p>
      <p>Practica vocabulario y gramática de forma fácil y efectiva.</p>
      <p>Ideal para cualquier nivel de aprendizaje.</p>
    </div>
  );
}

export default Home;