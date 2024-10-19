import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import FlashcardDetails from "../../components/FlashcardDetails";

function DeckEdit() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    getDeckDetails();
  },[])

  //Get details of this deck
  const getDeckDetails = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`);
      setDeckDetails(response.data);
      console.log(response.data);
      setTagsList(response.data.tags);
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  //States
  const [deckDetails, setDeckDetails] = useState(null)
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  
  //Handle states changes
  const handleChange = (e) => {
    const deckClone = structuredClone(deckDetails);
    e.target.name === "name"? deckClone.deckName = e.target.value : 
    e.target.name === "image"? deckClone.imageUrl = e.target.value : 
    deckClone.description = e.target.value
    setDeckDetails(deckClone);
  }
  //Handle tag input
  const handleTag = (e) => setTag(e.target.value);
  //Handle list of tags and add it to deck
  const handleTagList = (e) => {
    e.preventDefault();

    const newTags = [...deckDetails.tags, tag]
    const deckClone = structuredClone(deckDetails);
    deckClone.tags = newTags;
    setTag("");
    setDeckDetails(deckClone);
    console.log(deckClone);
  }
  //Handle value of languages checkboxes
  const handleChangeLang = (e) => {
    const newLangs = [...deckDetails.languages];
    //Si el lenguaje estaba incluido en el estado eliminarlo
    let index = newLangs.indexOf(e.target.value)
    if(index > -1) newLangs.splice(index, 1)
    else newLangs.push(e.target.value);
    const deckClone = structuredClone(deckDetails);
    deckClone.languages = newLangs;
    setDeckDetails(deckClone);
  }

  //Call to Update changes of this deck
  const handleEdit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await service.put(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`, deckDetails);
    } 
    catch (error) {
      console.log(error);
    }
  }
  //Call to Delete this deck
  const handleDelete = async (e) => {
    e.preventDefault();
    
    try {
      await service.delete(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`);
      navigate("/profile");
    } 
    catch (error) {
      console.log(error);  
    }
  }

  if(!deckDetails) return <h1>...Loading</h1>

  return(
    <div id="deck-edit">
      <form>

        <div>
          <label>Nombre: </label>
          <input onChange={handleChange} type="text" name="name" value={deckDetails.deckName}/>
        </div>

        <label>Image:</label>
        <input onChange={handleChange} type="text" name="image" value={deckDetails.imageUrl} />

        <label>Description:</label>
        <input onChange={handleChange} type="text" name="description" value={deckDetails.description}/>

        <div>
          <label>Tags</label>
          <input onChange={handleTag}type="text" name="tags" value={tag}/>
          <button onClick={handleTagList}>+</button>
        </div>
        {/* List of generated tags */}
        {deckDetails.tags.map(tag=>(<p key={tag}>{tag}</p>))}

        <div id="languages-checkbox" >
          <label>English</label>
          <input onChange={handleChangeLang} type="checkbox" name="en" value="English" defaultChecked={deckDetails.languages.includes("English")}/>
          <label>Spanish</label>
          <input onChange={handleChangeLang} type="checkbox" name="es" value="Spanish" defaultChecked={deckDetails.languages.includes("Spanish")}/>
          <label>French</label>
          <input onChange={handleChangeLang} type="checkbox" name="fr" value="French" defaultChecked={deckDetails.languages.includes("French")}/>
          <label>German</label>
          <input onChange={handleChangeLang} type="checkbox" name="de" value="German" defaultChecked={deckDetails.languages.includes("German")}/>
          <label>Portuguese</label>
          <input onChange={handleChangeLang} type="checkbox" name="pt" value="Portuguese" defaultChecked={deckDetails.languages.includes("Portuguese")}/>
          <label>Italian</label>
          <input onChange={handleChangeLang} type="checkbox" name="it" value="Italian" defaultChecked={deckDetails.languages.includes("Italian")}/>
        </div>

        {/* //TODO Flashcards Creation */}
        {/* {deckDetails.flashcards.map((fc,index)=><p key={`fc-${index}`}>{fc}</p>)} */}
        {deckDetails.flashcards.map((fc,index)=><FlashcardDetails key={`fc-${index}`} flashId={fc} setDeckDetails={setDeckDetails}/>)}

        {/* <button>+</button> */}

        </form>

        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default DeckEdit;