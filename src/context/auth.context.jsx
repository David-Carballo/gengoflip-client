import { createContext, useEffect, useState } from "react";
import service from "../services/config";

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
    return <h3>... validando usuario</h3>
    //todo Añadir loading o algun tipo de validación
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