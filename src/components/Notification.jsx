import { useContext } from "react";
import { NotifyContext } from "../context/notify.context";

function Notification(){

  const {message, showNotification, setMessage, setShowNotification} = useContext(NotifyContext)

  const handleClose = ()=>{
    setMessage("");
    setShowNotification(false);
  }

  if(!showNotification) return null;

  return(
    <div id="notification">
      <p>{message}</p>
      <p onClick={handleClose}>❌</p>
    </div>
  )
}

export default Notification;