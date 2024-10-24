import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css'
import { useEffect, useState } from 'react';
import service from '../../services/config';

function Dashboard() {

  const navigate = useNavigate();

  useEffect(()=>{
    getMostRated();
    getUserData();
  }
  ,[])

  const getMostRated = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/`)
      response.data.sort((a,b)=>(a.savedCount > b.savedCount? -1 : 1))
      setMostDecks(response.data.slice(0,3));
    } 
    catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/`);
      setUserData(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleEnterSearch = (e) => {
    if(e.key === 'Enter') {
      navigate(`/library?search=${e.target.value}`)
    }
  }
  const handleCreate = (e) => {
    e.preventDefault();
    navigate("/decks/create");
  }

  const getDecksCompleted = () => {
    let completed = 0;
    for(let i = 0; i<userData.deckLibrary.length; i++) {
      let total = userData.deckLibrary[i].deckId.flashcards.length;
      if(total === userData.deckLibrary[i].passedFlashcards) completed++;
    }
    return completed
  }
  const getDecksInProgress = () => {
    let inProgress = 0;
    for(let i = 0; i<userData.deckLibrary.length; i++) {
      let total = userData.deckLibrary[i].deckId.flashcards.length;
      if(userData.deckLibrary[i].passedFlashcards > 0 && userData.deckLibrary[i].passedFlashcards < total) inProgress++;
    }
    return inProgress
  }
  const getDecksToDo= () => {
    let toDo = 0;
    for(let i = 0; i<userData.deckLibrary.length; i++) {
      if(userData.deckLibrary[i].previousLesson === null) toDo++;
    }
    return toDo
  }

  const [searchValue, setSearchValue] = useState("");
  const [mostDecks, setMostDecks] = useState(null);
  const [userData, setUserData] = useState(null);

  if(!mostDecks || !userData) return <h3>Loading...</h3>

  return(
    <div id="dashboard" className='flex-c g50'>

      <div id="dashboard-bar" className='flex-r justify-between g20 w-80'>
        <input onChange={(e)=>setSearchValue(e.target.value)} onKeyDown={handleEnterSearch} value={searchValue} placeholder={`Search decks...`} className='w-50'/>
        <button onClick={handleCreate}>+ Create Deck</button>
      </div>

      <Link to="/library" id="dashboard-panel">
        <h2>Learn now!</h2>
      </Link>

      <div  className='w-80'>
        <div className='flex-r justify-between'>
          <p>Most rated</p>
          <Link to="/library" className='flex-r justify-start'>See all</Link>
        </div>
        <div id="dashboard-most" className='flex-r justify-around'>
          {mostDecks.map((deck,index)=>{
            return(
              <Link to={`/decks/${deck._id}`} key={index} className='most-container'>
                <img src={deck.imageUrl} alt="deck image" />
                <h5>{deck.deckName}</h5>
              </Link>
            )
          })}
        </div>
      </div>

      <Link to="/profile" id="dashboard-profile" className='w-80'>
          <div className='title'>
            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="profile-img"/>
            <h3 className="w-100">{userData.username}</h3>
          </div>
          <div className="container flex-r align-center g10">
            <div>
              <label>Completed ({getDecksCompleted()}/{userData.deckLibrary.length})</label>
              <div id="progress-bar" className="flex-r g10">
                <div id="progress" style={{width: `${200/(userData.deckLibrary.length)*getDecksCompleted()}px`}}></div>
              </div>
            </div>
            <div>
              <label>In Progress ({getDecksInProgress()}/{userData.deckLibrary.length}) </label>
              <div id="progress-bar" className="flex-r g10">
                <div id="progress" style={{width: `${200/(userData.deckLibrary.length)*getDecksInProgress()}px`}}></div>
              </div>
            </div>
            <div>
              <label>To Do ({getDecksToDo()}/{userData.deckLibrary.length})</label>
              <div id="progress-bar" className="flex-r g10">
                <div id="progress" style={{width: `${200/(userData.deckLibrary.length)*getDecksToDo()}px`}}></div>
              </div>
            </div>
          </div>

      </Link>

    </div>
  );
}

export default Dashboard;