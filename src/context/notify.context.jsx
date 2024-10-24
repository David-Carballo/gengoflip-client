import { createContext, useState } from "react";

const NotifyContext = createContext();

function NotifyWrapper(props) {
  
  const [message, setMessage] = useState(""); 
  const [showNotification, setShowNotification] = useState(false);

  const passedContext = {
    message,
    showNotification,
    setMessage,
    setShowNotification
  }

  return(
    <NotifyContext.Provider value={passedContext}>
      {props.children}
    </NotifyContext.Provider>
  )

}

export {NotifyWrapper, NotifyContext};