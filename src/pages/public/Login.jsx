import service from "../../services/config.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import '../../styles/Login.css'

function Login() {

  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    try {
      const userCredentials = {
        email,
        password
      }
      
      // const response = await axios.post("http://localhost:5005/api/auth/login", userCredentials)
      const response = await service.post("/auth/login", userCredentials)

      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser()

      navigate("/profile")

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        //! aqui deberia haber redirección a /error
      }
    }
  };

  useEffect(()=>{
    if(isLoggedIn) navigate("/profile");  
  },[])

  return(
    <div id="login">
      <div id="login-card" className="flex-r">
        <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" className="w-50"/>
        <div className="w-100 flex-c ">
          <h3>Welcome back</h3>
          <p>Enter your email and password to continue.</p>
          <form onSubmit={handleLogin} className="flex-c align-center g10 w-50">
            <label className="w-100 start">Email</label>
            <input className="w-100 start" type="email" name="email" value={email} onChange={handleEmailChange}/>
            <label className="w-100 start">Password</label>
            <input className="w-100 start" type="password" name="password" value={password} onChange={handlePasswordChange}/>

            <button type="submit">Acceder</button>
            {errorMessage && <p>{errorMessage}</p>}

          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;