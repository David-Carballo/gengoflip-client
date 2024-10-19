import { useContext, useState } from 'react';
import '../../styles/Deck.css'
import service from '../../services/config';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import FlashcardCreate from '../../components/FlashcardCreate';

function DeckCreate() {

  const {loggedUserId} = useContext(AuthContext);
  const navigate = useNavigate();

  //States
  const [deckName, setDeckName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({
    cardName: "",
    description: "",
    originalLang: "",
    translations: [],
    imageUrl: "",
    owner: loggedUserId
  })
  const [flashcardsList, setFlashcardsList] = useState([]);

  //Handle input changes
  const handleName = (e) => setDeckName(e.target.value);
  const handleImage = (e) => setImageUrl(e.target.value);
  const handleDesc = (e) => setDescription(e.target.value);
  const handleTag = (e) => setTag(e.target.value);
  //Handle list of tags and add it to deck
  const handleTagList = (e) => {
    e.preventDefault();
    const newTags = [...tagsList, tag]
    setTag("");
    setTagsList(newTags);
  }
  //Handle value of languages checkboxes
  const handleChangeLang = (e) => {
    const newLangs = [...languages];
    //Si el lenguaje estaba incluido en el estado eliminarlo
    let index = newLangs.indexOf(e.target.value)
    if(index > -1) newLangs.splice(index, 1)
    else newLangs.push(e.target.value);

    setLanguages(newLangs);
  }
  //Call to Post new deck in db
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newDeck = {
        deckName,
        imageUrl,
        description,
        tags: tagsList,
        languages,
        flashcards: []
      }

      // const responseMany = await service.post(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/many`, flashcardsList);

      newDeck.flashcards = flashcardsList.map((e)=>e._id);

      const response = await service.post(`${import.meta.env.VITE_SERVER_URL}/api/decks/`, newDeck);
      // navigate(`/decks/${response.data._id}`);
    } 
    catch (error) {
      console.log(error);
    }
  }

  return(
    <div id="deck-create">
    
      <form>

        <div>
          <label>Nombre: </label>
          <input onChange={handleName} type="text" name="name" value={deckName}/>
        </div>

        <label>Image:</label>
        <input onChange={handleImage} type="text" name="image" value={imageUrl} />

        <label>Description:</label>
        <input onChange={handleDesc} type="text" name="description" value={description}/>

        <div>
          <label>Tags</label>
          <input onChange={handleTag}type="text" name="tags" value={tag}/>
          <button onClick={handleTagList}>+</button>
        </div>
        {/* List of generated tags */}
        {tagsList.map((tag,index)=>(<p key={`tag-${index}`}>{tag}</p>))}
        <br/>
        {/*//TODO Update languages with Flashcards value / Permitir solo estos languages en flashcards */}
        <div id="languages-checkbox">
          <label>English</label>
          <input onChange={handleChangeLang} type="checkbox" name="en" value="English" />
          <label>Spanish</label>
          <input onChange={handleChangeLang} type="checkbox" name="es" value="Spanish" />
          <label>French</label>
          <input onChange={handleChangeLang} type="checkbox" name="fr" value="French" />
          <label>German</label>
          <input onChange={handleChangeLang} type="checkbox" name="de" value="German" />
          <label>Portuguese</label>
          <input onChange={handleChangeLang} type="checkbox" name="pt" value="Portuguese" />
          <label>Italian</label>
          <input onChange={handleChangeLang} type="checkbox" name="it" value="Italian" />
        </div>

        {/* Flashcards Creation */}
        {flashcardsList.map((flashcard,index)=>{
          return(
            <div key= {`flash-${index}`} id="flashcard-container">
              <p>{flashcard.cardName}</p>
            </div>
          )
        })}
        
        <FlashcardCreate newFlashcard={newFlashcard} setNewFlashcard={setNewFlashcard} setFlashcardsList={setFlashcardsList}/>

        <br/>
        <br/>
        {/* <button>+</button> */}

      </form>
      
      <div>
        <button>Discard</button>
        <button onClick={handleCreate}>Create</button>
      </div>

    
    </div>
  );
}

export default DeckCreate;