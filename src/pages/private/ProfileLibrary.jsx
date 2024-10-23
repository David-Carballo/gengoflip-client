import { useEffect, useState } from "react";
import service from "../../services/config";
import '../../styles/ProfileLibrary.css'
import { Link } from "react-router-dom";
import flashIcon from "../../assets/flashcard.svg"

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
    } 
    catch (error) {
      console.log(error);  
    }
  }

  if(!allDecks) return(<h3>Loading...</h3>)
  
  return(
    <div id="profile-library" className="flex-c g20 align-start">

      <div className="flex-r justify-between w-100">
        <h2>My decks</h2>
        <input type="text" className="w-50" placeholder="Search decks..."/>
        <Link to="/decks/create"><button>+  Add deck</button></Link>
      </div>

      <div className="flex-r wrap w-100 g20">
        {allDecks.length? 
          allDecks.map((deck,index)=>{
            return(
              <Link to={`/decks/${deck.deckId._id}`}id="my-decks-card" className="flex-r g10" key={`deck-${index}`}>
                <img src={deck.deckId.imageUrl} alt="deck image" />
                <div className="flex-c justify-between align-center g20 ">
                  <h5>{deck.deckId.deckName} </h5>
                  <div className="flex-r justify-between">
                    <div className="flex-r w-50">
                      <p>{deck.passedFlashcards} / {deck.deckId.flashcards.length}</p>
                      <img src={flashIcon} alt="flashcard icon" />
                    </div>
                    <p> {deck.previousLesson? deck.previousLesson : "Not yet"}</p>
                  </div>
                </div>
              </Link>
            )
          }) : 
          <p>You haven't created any deck yet</p>
        }

      </div>
    </div>
  );
}

export default ProfileLibrary;