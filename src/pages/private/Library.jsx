import { useContext, useEffect, useState } from "react";
import service from "../../services/config";
import enIcon from "../../assets/en.png"
import esIcon from "../../assets/es.png"
import frIcon from "../../assets/fr.png"
import deIcon from "../../assets/de.png"
import ptIcon from "../../assets/pt.png"
import itIcon from "../../assets/it.png"
import savedIcon from "../../assets/bookmark.svg"
import savedFillIcon from "../../assets/bookmark-fill.svg"
import ownerIcon from "../../assets/person.svg"
import flashIcon from "../../assets/flashcard.svg"
import { Link } from "react-router-dom"
import '../../styles/Library.css'
import { AuthContext } from "../../context/auth.context";

function Library() {

  const {loggedUserId} = useContext(AuthContext);
  
  useEffect(()=>{
    getDecks();
    getMyDecks();
  },[])

  //States
  const [allDecks, setAllDecks] = useState(null);
  const [myDecks, setMyDecks] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  //API Calls
  const getDecks = async() => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/`);
      setAllDecks(response.data);
    } 
    catch (error) {
      console.log(error);  
    }
  }

  const getMyDecks = async() => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/`);
      console.log("Mydecks",response.data.deckLibrary.map(e => e.deckId._id));
      setMyDecks(response.data.deckLibrary.map(e => e.deckId._id))
    } 
    catch (error) {
      console.log(error)  
    }
  }

  const handleSaved = async (e, index, id, savedCount) => {
    e.preventDefault();
    try {
      let newCount = savedCount+1;
      const clone = structuredClone(allDecks);
      clone[index].savedCount = newCount;
      setAllDecks(clone);
      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/decks/${id}`, {savedCount: newCount}, {new:true})

      console.log("Guardado");
      const response = await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/add-deck`, {deckId: id}, {new:true})
      console.log(response.data);
      

      setMyDecks(response.data.deckLibrary.map(e => e.deckId));

    } 
    catch (error) {
      console.log(error)
    }
  }

  const handleUnsaved = async (e, index, id, savedCount) => {
    e.preventDefault();
    try {
      let newCount = savedCount-1;
      const clone = structuredClone(allDecks);
      clone[index].savedCount = newCount;
      setAllDecks(clone);
      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/decks/${id}`, {savedCount: newCount}, {new:true})

      console.log("Eliminado");
      const response = await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/remove-deck`, {deckId: id}, {new:true})
      console.log(response.data.deckLibrary.map(e => e.deckId));

      setMyDecks(response.data.deckLibrary.map(e => e.deckId));
    } 
    catch (error) {
      console.log(error)
    }
  }

  if(!allDecks || !myDecks) return(<h3>Loading...</h3>)
  
  return(
    <div id="library" className="flex-c g20 w-80">
      <div className="flex-r justify-between w-80">
        <h2>Library</h2>
        <input onChange={(e) => setSearchValue(e.target.value)}type="text" className="w-50" placeholder="Search decks, tags, languages..." value={searchValue}/>
        <Link to="/decks/create"><button>+  Add deck</button></Link>
      </div>
      <div className="flex-r wrap g20 w-80">  
        {/* {allDecks.map((deck,index)=> <Deck key={`dcard-${index}`} deck={deck}/>)} */}
        {allDecks
        .filter((deck)=> {
          if(deck.deckName.toLowerCase().includes(searchValue.toLowerCase())) return true;
          for(const lang of deck.languages) {
            if(lang.toLowerCase().includes(searchValue.toLowerCase())) return true;
          }
          for(const tag of deck.tags) {
            if(tag.toLowerCase().includes(searchValue.toLowerCase())) return true;
          }
        })
        .map((deck,index)=> {
          return(
            <div key={index} id="my-decks-card" className="flex-c ">
              <div className="flex-c">
                {myDecks.includes(deck._id) ? 
                  <button onClick={(e)=>{handleUnsaved(e,index,deck._id, deck.savedCount)}} disabled={deck.owner === loggedUserId}>
                    <img src={deck.owner === loggedUserId? ownerIcon:savedFillIcon} alt="save icon"/>
                  </button> : 
                  <button onClick={(e)=>{handleSaved(e,index,deck._id, deck.savedCount)}} ><img src={savedIcon} alt="save icon" /></button>
                }
              </div>
              <Link to={`/decks/${deck._id}`} className="flex-r justify-between p10 h-100">
                <img src={deck.imageUrl} alt="deck image" className="deck-img"/> 

                <div className="flex-c justify-between align-start h-100">
                  <h5>{deck.deckName}</h5>
                  {/* <div className="flex-r wrap g10">
                    {tags.map((tag,index) => {
                      return (<label key={`tag-${index}`} id="deck-tags">{tag}</label>)
                      })
                    }
                  </div> */}
                  <div id="languages-list" className="flex-r">
                    {deck.languages.map((language)=>{
                      if(language==="English") return(<img key={language} src={enIcon}/>)
                      else if(language==="Spanish") return(<img key={language} src={esIcon}/>)
                      else if(language==="French") return(<img key={language}src={frIcon}/>)
                      else if(language==="German") return(<img key={language} src={deIcon}/>)
                      else if(language==="Portuguese") return(<img key={language}src={ptIcon}/>)
                      else if(language==="Italian") return(<img key={language} src={itIcon}/>)
                    })}
                  </div>
                  <br/>
                  <div className="flex-r justify-between">
                    <div className="flex-r w-50">
                      <p>{deck.flashcards.length}</p>
                      <img src={flashIcon} alt="saved icon" />
                    </div>
                    <div className="flex-r -50">
                      <p>{deck.savedCount}</p>
                      <img src={savedIcon} alt="saved icon" />
                    </div>
                  </div>
                </div>


              </Link>
            </div>
          )})
        }
      </div>
    </div>
  );
}

export default Library;