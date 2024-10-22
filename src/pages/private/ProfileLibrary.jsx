import { useEffect, useState } from "react";
import service from "../../services/config";
import '../../styles/ProfileLibrary.css'
import { Link } from "react-router-dom";


function ProfileLibrary() {
  useEffect(()=>{
    getDecks();
  },[])

  
  //States
  const [allDecks, setAllDecks] = useState(null);

  //API Calls
  const getDecks = async() => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/library`);
      setAllDecks(response.data.deckLibrary);
      console.log(response.data);
    } 
    catch (error) {
      console.log(error);  
    }
  }

  if(!allDecks) return(<h3>Loading...</h3>)
  
  return(
    <div id="profile-library" className="flex-c g20 align-start">
      {/* Search bar/Filter */}
      {/* Create */}
      <div className="flex-r justify-between w-100">
        <h2>My decks</h2>
        <input type="text" className="w-50" placeholder="Search decks..."/>
        <Link to="/decks/create"><button>+  Add deck</button></Link>
      </div>
      <div className="flex-r wrap">
        {allDecks.deckLibrary? 
          allDecks.map((deck,index)=><p key={`deck-${index}`}>{deck.deckId.deckName} {deck.passedFlashcards} {deck.previousLesson? deck.previousLesson : "Not yet"}</p>) : 
          <p>You haven't created any deck yet</p>
        }

      </div>
    </div>
  );
}

export default ProfileLibrary;