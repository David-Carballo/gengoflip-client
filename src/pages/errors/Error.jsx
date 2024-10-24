import { useNavigate } from "react-router-dom";
import '../../styles/Error.css'

function Error(){

  const navigate = useNavigate();

  const handleGoHome = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return(
    <div id="error" className="flex-c g50">
      <h1>Oops! Something went wrong.</h1>
      <p >We encountered an unexpected error. Please try again later.</p>
      <button onClick={handleGoHome}>
          Go back to Home
      </button>
    </div>
  );
}

export default Error;