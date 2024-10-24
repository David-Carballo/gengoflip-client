import service from "../../services/config.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import '../../styles/Login.css'
import bgLogin from '../../assets/bg-login.jpg'
import { RotatingLines } from 'react-loader-spinner'

function Login() {

  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [isLogging, setIsLogging] = useState(false)

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

    return(
      setIsLogging(false)
    )
  },[])

  return(
    <div id="login">
      <div id="login-card" className="flex-r">
        <img src={bgLogin} alt="" className="w-50"/>
        <div className="w-100 flex-c g10 p10">
          <h2>Welcome back</h2>
          <br/>
          <br/>
          <p>Enter your email and password to continue.</p>
          <form onSubmit={handleLogin} className="flex-c align-center g10 w-50">
            <label className="w-100 start">Email</label>
            <input className="w-100 start" type="email" name="email" value={email} onChange={handleEmailChange}/>
            <label className="w-100 start">Password</label>
            <input className="w-100 start" type="password" name="password" value={password} onChange={handlePasswordChange}/>

            <button type="submit" onClick={() => setIsLogging(true)} >Acceder</button>
            {<RotatingLines
              visible={isLogging && !errorMessage}
              height="25"
              width="25"
              strokeColor="var(--background-color)"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />}
            {errorMessage && <p>{errorMessage}</p>}

          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;