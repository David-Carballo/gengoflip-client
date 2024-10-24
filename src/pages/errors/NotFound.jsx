import { useNavigate } from "react-router-dom";
import '../../styles/Error.css'

function NotFound(){

  const navigate = useNavigate();

  const handleGoHome = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return(
    <div id="not-found" className="flex-c g50">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might have been removed or doesn't exist.</p>
      <button onClick={handleGoHome}>Go back to Home</button>
    </div>
  );
}

export default NotFound;