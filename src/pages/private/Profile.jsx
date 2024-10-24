import { useContext, useEffect, useState } from "react";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import '../../styles/Profile.css'
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  //Get user details
  useEffect(()=>{
    getUserDetails();
  },[])

  const getUserDetails = async () =>{
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`)
      setUserData(response.data);
      setAuxUserData(response.data);
      console.log(response.data)
    } 
    catch (error) {
      console.log(error)
    }
  }

  //STATES
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [auxUserData, setAuxUserData] = useState(null)

  //Handle input changes
  
  const handleChange = (e) => {
    const cloneUserData = structuredClone(auxUserData);
    cloneUserData[e.target.name] = e.target.value;
    setAuxUserData(cloneUserData);
  }
  const handleDiscard = (e) => {  
    e.preventDefault();
    setAuxUserData(userData);
    setIsEditMode(false);
  }
  
  //Handle CRUD User
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const response = await service.delete(`${import.meta.env.VITE_SERVER_URL}/api/users/delete`)
    console.log(response);
    localStorage.removeItem("authToken")
    await authenticateUser();
    navigate("/")
  }
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await service.put(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, auxUserData, {new: true})
      console.log(response)
      setIsEditMode(false);
      setUserData(auxUserData);
    } 
    catch (error) {
      console.log(error);  
    }
  }

  const getDecksCompleted = () => {
    let completed = 0;
    for(let i = 0; i<userData.deckLibrary.length; i++) {
      let total = userData.deckLibrary[i].deckId.flashcards.length;
      if(total === userData.deckLibrary[i].passedFlashcards) completed++;
    }
    console.log(completed, " completed")
    return completed
  }
  const getDecksInProgress = () => {
    let inProgress = 0;
    for(let i = 0; i<userData.deckLibrary.length; i++) {
      let total = userData.deckLibrary[i].deckId.flashcards.length;
      if(userData.deckLibrary[i].passedFlashcards > 0 && userData.deckLibrary[i].passedFlashcards < total) inProgress++;
    }
    console.log(inProgress, " inProgress")

    return inProgress
  }
  const getDecksToDo= () => {
    let toDo = 0;
    for(let i = 0; i<userData.deckLibrary.length; i++) {
      if(userData.deckLibrary[i].previousLesson === null) toDo++;
    }
    console.log(toDo, " toDo")

    return toDo
  }

  if(!userData) return (<h3>Loading...</h3>)

  return(
    <div id="profile" className="flex-c g50">
      {/* Profile info */}
      <div id="profile-card" className="flex-c g10">
        <div className="flex-r g10 justify-between w-50">
          <div className="w-100 flex-r justify-start h10">
              {isEditMode && <button id="delete-btn" onClick={handleDeleteUser}>Delete account</button>}
          </div>
          {isEditMode && <button onClick={handleDiscard}>Discard</button>}
          {isEditMode && <button onClick={handleSave}>Save</button>}

          {!isEditMode && <button onClick={handleEdit}>✏️</button>}
        </div>
        <div className="flex-r g50">
          <img src={auxUserData.profileImg} alt="profile-img"/>
          <h3>{auxUserData.username}</h3>

        </div>
        <hr/>
        <div className="flex-c align-start justify-center">
          <div className="w-100 flex-r justify-start g20">
            <label>Email:&emsp;&emsp;&nbsp;&nbsp;</label>
            <input type="text" value={auxUserData.email} disabled/>
          </div>
          <div className="w-50 flex-r justify-start g20">
            <label>First Name:</label>
            <input onChange={handleChange} type="text" name="firstName" disabled={!isEditMode} value={auxUserData.firstName} />
          </div>
          <div className="w-100 flex-r justify-start g20">
              <label>Last Name:</label>
              <input onChange={handleChange} type="text" name="lastName" disabled={!isEditMode} value={auxUserData.lastName} />
          </div>
        </div>

      </div>
      {/* User Progress */}
      <div id="profile-progress" className="flex-r align-center g10">
        <div className="flex-c align-start justify-center g10">
          <label>Completed ({getDecksCompleted()}/{userData.deckLibrary.length})</label>
          <label>In Progress ({getDecksInProgress()}/{userData.deckLibrary.length}) </label>
          <label>To Do ({getDecksToDo()}/{userData.deckLibrary.length})</label>
        </div>
        <div className="flex-c align-start justify-center g20">
          <div id="progress-bar" className="flex-r g10">
            <div id="progress" style={{width: `${200/(userData.deckLibrary.length)*getDecksCompleted()}px`}}></div>
          </div>
          <div id="progress-bar" className="flex-r g10">
            <div id="progress" style={{width: `${200/(userData.deckLibrary.length)*getDecksInProgress()}px`}}></div>
          </div>
          <div id="progress-bar" className="flex-r g10">
            <div id="progress" style={{width: `${200/(userData.deckLibrary.length)*getDecksToDo()}px`}}></div>
          </div>
        </div>
      </div>

      {/* My sets */}
      <Link to="/profile/library" id="profile-decks" className="w-80 flex-c g10 align-start">
        <h4 className="flex-r">My decks</h4>
        <div className="flex-r wrap w-100 g20">
          {userData.deckLibrary.length? userData.deckLibrary.map((deck,index) => {
            return(
              <div key={index} id="my-decks">
                <img src={deck.deckId.imageUrl} alt="deck image"/> 
                <p>{deck.deckId.deckName}</p>
              </div>
            )
          }) : <p>Not decks available yet</p>
          }
        </div>
      </Link>
    </div>
  );
}

export default Profile;