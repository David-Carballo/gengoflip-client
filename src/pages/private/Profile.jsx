import { useContext, useEffect, useState } from "react";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import '../../styles/Profile.css'

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
    <div id="profile" className="flex-c">
      <div id="profile-card" className="flex-c g10">
        <div className="flex-r justify-end edit-container">
          {isEditMode && <button onClick={handleEdit}>Discard</button>}
          {isEditMode && <button onClick={handleSave}>Save</button>}

          {!isEditMode && <button onClick={handleEdit}>✏️</button>}
        </div>
        <div className="flex-r justify-between">
          <img src={userData.profileImg} alt="profile-img"/>
          {/* <label>User:</label> */}
          <h3 className="w-100">{userData.username}</h3>
        </div>
        <hr/>
        <div className="flex-c align-start">
          <div className="w-100 flex-r justify-between">
            <label>Email:</label>
            <input type="text" readOnly={!isEditMode} value={userData.email} />
          </div>
          <div className="w-100 flex-r justify-between">
            <label>First Name:</label>
            <input onChange={handleChange} type="text" name="firstName" readOnly={!isEditMode} value={userData.firstName} />
          </div>
          <div className="w-100 flex-r justify-between">
              <label>Last Name:</label>
              <input onChange={handleChange} type="text" name="lastName" readOnly={!isEditMode} value={userData.lastName} />
          </div>
        </div>


      </div>
      {/* User Progress */}

      {/* My sets */}
    </div>
  );
}

export default Profile;