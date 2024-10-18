import { useContext, useEffect, useState } from "react";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

function Profile() {

  useEffect(()=>{
    getUserDetails();
  },[])

  const getUserDetails = async () =>{
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`)
      setUserData(response.data);
    } 
    catch (error) {
      console.log(error)
    }
  }

  // TODO Discard => Volver a dejar la data tal como estaba...solo actualizar userData cuando save changes
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const handleChange = (e) => {
    const cloneUserData = structuredClone(userData);
    cloneUserData[e.target.name] = e.target.value;
    setUserData(cloneUserData);
  }
  
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await service.put(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, userData, {new: true})
      console.log(response)
      setIsEditMode(false);
    } 
    catch (error) {
      console.log(error);  
    }
  }

  if(!userData) return (<h3>Loading...</h3>)

  return(
    <div id="profile">
      <div>
        <img src={userData.profileImg} style={{width: "200px"}} alt="profile-img"/>
        {/* <label>User:</label> */}
        <h3>{userData.username}</h3>
      </div>
      <label>Email:</label>
      <input type="text" readOnly={!isEditMode} value={userData.email} />
      <div>
        <label>First Name:</label>
        <input onChange={handleChange} type="text" name="firstName" readOnly={!isEditMode} value={userData.firstName} />
      </div>
      <div>
          <label>Last Name:</label>
          <input onChange={handleChange} type="text" name="lastName" readOnly={!isEditMode} value={userData.lastName} />
      </div>


      {isEditMode && <button onClick={handleEdit}>Discard</button>}
      {isEditMode && <button onClick={handleSave}>Save</button>}

      {!isEditMode && <button onClick={handleEdit}>Edit</button>}

      {/* User Progress */}

      {/* My sets */}
    </div>
  );
}

export default Profile;