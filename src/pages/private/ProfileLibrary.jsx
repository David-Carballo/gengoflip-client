import { useEffect, useState } from "react";
import service from "../../services/config";

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
    <div id="profile-library">
      <h3>Library</h3>
      {allDecks.map((deck,index)=><p key={`deck-${index}`}>{deck.deckId.deckName} {deck.passedFlashcards} {deck.previousLesson? deck.previousLesson : "Not yet"}</p>)}
    </div>
  );
}

export default ProfileLibrary;