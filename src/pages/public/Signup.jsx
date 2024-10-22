import service from "../../services/config";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import '../../styles/Signup.css'

function Signup() {
  const { isLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const newUser = {
        email,
        username,
        password
      }
      
      // await axios.post("http://localhost:5005/api/auth/signup", newUser)
      await service.post("/auth/signup", newUser)

      navigate("/login")

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
    <div id="signup">
      <div id="signup-card"  className="flex-r">
        <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" className="w-50"/>
        <div className="w-100 flex-c g10 p10">
          <h2>Create an account</h2>
          <br/>
          <br/>
          <form onSubmit={handleSignup} className="flex-c align-center g10 w-50">
            <label className="w-100 start">Email</label>
            <input className="w-100 start" type="email" name="email" value={email} onChange={handleEmailChange}/>
            <label className="w-100 start">Username</label>
            <input className="w-100 start" type="text" name="username" value={username} onChange={handleUsernameChange}/>
            <label className="w-100 start">Password</label>
            <input className="w-100 start" type="password" name="password" value={password} onChange={handlePasswordChange}/>

            <button type="submit">Sign up</button>

            {errorMessage && <p>{errorMessage}</p>}

          </form>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
       
        </div>
      </div>
    </div>
  );
}

export default Signup;