import { useEffect, useState } from "react";
import service from "../../services/config";
import Deck from "../../components/Deck";
import '../../styles/Library.css'

function Library() {
  
  useEffect(()=>{
    getDecks();
  },[])

  //States
  const [allDecks, setAllDecks] = useState(null);

  //API Calls
  const getDecks = async() => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/`);
      setAllDecks(response.data);
      console.log(response.data);
    } 
    catch (error) {
      console.log(error);  
    }
  }

  if(!allDecks) return(<h3>Loading...</h3>)
  
  return(
    <div id="library">
      <h1>Library</h1>
      {allDecks.map((deck,index)=> <Deck key={`dcard-${index}`} deck={deck}/>)}
    </div>
  );
}

export default Library;