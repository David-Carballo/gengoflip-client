import { createContext, useEffect, useState } from "react";
import service from "../services/config";
import { RotatingSquare } from 'react-loader-spinner'

// Componente de contexto
const AuthContext = createContext()

// Componente envoltorio
function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  useEffect(() => {
    authenticateUser()
  }, [])

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify")

      // si token valido
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsValidatingToken(false)

    } catch (error) {
      // token no es valido o no existe
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)
    }

  }

  //Datos que contiene el contexto(usuario loggeado?, idUser loggeado, función verificar token)
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
  }

  if (isValidatingToken) {
    return (
      <div className="loading flex-c">
        <h2>GengoFlip</h2>
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          strokeWidth="5"
          color="rgb(64, 126, 54)"
          ariaLabel="rotating-square-loading"
          wrapperStyle={{borderRadius: "10px"}}
          wrapperClass=""
        />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}