import { useContext, useState } from 'react';
import '../../styles/Deck.css'
import service from '../../services/config';
import { useNavigate } from 'react-router-dom';
import FlashcardCreate from '../../components/FlashcardCreate';
import enIcon from "../../assets/en.png"
import esIcon from "../../assets/es.png"
import frIcon from "../../assets/fr.png"
import deIcon from "../../assets/de.png"
import ptIcon from "../../assets/pt.png"
import itIcon from "../../assets/it.png"
import Notification from '../../components/Notification';
import { NotifyContext } from '../../context/notify.context';

function DeckCreate() {

  const navigate = useNavigate();
  const {setMessage, setShowNotification} = useContext(NotifyContext);

  //States
  const [deckName, setDeckName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [newFlashcard, setNewFlashcard] = useState({
    cardName: "",
    description: "",
    originalLang: "English",
    translations: [],
    imageUrl: ""
  })
  const [flashcardsList, setFlashcardsList] = useState([]);
  const [isCreating, setIsCreating] = useState(false)

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

  //Handle delete tag
  const handleDeleteTag = (e) => {
    e.preventDefault();
    const newTags = [...tagsList];
    //Si el lenguaje estaba incluido en el estado eliminarlo
    let index = newTags.indexOf(e.target.name)
    if(index > -1) newTags.splice(index, 1)
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
  //Handle discard create
  const handleDiscard = async (e) => {
    try {
      const ids = flashcardsList.map((e)=>e._id);
      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/many`, {ids : ids});
      navigate(-1);
    } 
    catch (error) {
      navigate("/error")
    }
  } 
  //Call to Post new deck in db
  const handleCreate = async (e) => {
    e.preventDefault();
    if(!deckName || !languages || !flashcardsList.length) {
      setErrorMessage("Complete all fields")
      return;
    }
    
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

      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/add-deck`, {deckId: response.data._id})
      
      setMessage("Deck created successfully")
      setShowNotification(true)
      let timer=setTimeout(()=>{
        setShowNotification(false)
        clearTimeout(timer);
      },[3000])

      navigate(`/decks/${response.data._id}`);
    } 
    catch (error) {
      navigate("/error")
    }
  }
  const handleFileUpload = async (e) => {

    if (!e.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    // setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await service.post(`${import.meta.env.VITE_SERVER_URL}/api/uploads`, uploadData)
      setImageUrl(response.data.imageUrl);
    } 
    catch (error) {
      navigate("/error")
    }
  }

  return(
    <div id="deck-create" className='flex-c align-start g20'>
        <Notification/>
        <div className='flex-r justify-between w-100'>
          <h2>Create new Deck</h2>
          <div className='flex-r g20'>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            <button onClick={handleDiscard}>Discard</button>
            <button onClick={handleCreate}>Create</button>
          </div>    
        </div>
        {/* Image + title */}
        <div className="flex-r w-100 justify-start g50">
          <div id="profile-img">
            <div id="upload-btn">
              <input id="input-btn" type="file" name="imageUrl" onChange={handleFileUpload}/> 
            </div>
            <img src={imageUrl} alt="deck image" hidden={!imageUrl}/>
          </div>
          <input onChange={handleName} placeholder="Title" type="text" name="name" value={deckName}/>
        </div>

        {/* Tags */}
        <div className='flex-r g10 w-100'>
          {tagsList.map((tag,index) => {
              return (              
              <div key={`tag-${index}`} id="deck-tags">
                <label id="tag">{tag}</label>
                <button onClick={handleDeleteTag} name={tag}>❌</button>
              </div>)
            }
          )}
          <div className='flex-r w-100 justify-start'>
            <div className='flex-r g10'>
              <input onChange={handleTag} placeholder="Add new tags..." type="text" name="tags" value={tag}/>
              <button onClick={handleTagList}>+</button>
            </div>
          </div>
        </div>
        {/* Description */}
        <textarea onChange={handleDesc} placeholder="Write here the deck's description..." className="w-100" type="text" name="description" rows="3" value={description}/>

        
        {/* Languages select */}
        <div className='flex-c align-start g10'>
          <p>What languages ​​does your deck support?</p>
          <div id="languages-checkbox" className='flex-r wrap w-100 g10'>
            <label className="container flex-r g10">
              <input onChange={handleChangeLang} type="checkbox" name="en" value="English" />
              <div className="checkmark" style={{backgroundImage: `url(${enIcon})`}}></div>
              <p>English</p>
            </label>
            <label className="container flex-r g10">
              <input onChange={handleChangeLang} type="checkbox" name="es" value="Spanish" />
              <div className="checkmark" style={{backgroundImage: `url(${esIcon})`}}></div>
              <p>Spanish</p>
            </label>
            <label className="container flex-r g10">
              <input onChange={handleChangeLang} type="checkbox" name="fr" value="French" />
              <div className="checkmark" style={{backgroundImage: `url(${frIcon})`}}></div>
              <p>French</p>
            </label>
            <label className="container flex-r g10">
              <input onChange={handleChangeLang} type="checkbox" name="de" value="German" />
              <div className="checkmark" style={{backgroundImage: `url(${deIcon})`}}></div>
              <p>German</p>
            </label>
            <label className="container flex-r g10">
              <input onChange={handleChangeLang} type="checkbox" name="pt" value="Portuguese" />
              <div className="checkmark" style={{backgroundImage: `url(${ptIcon})`}}></div>
              <p>Portuguese</p>
            </label>
            <label className="container flex-r g10">
              <input onChange={handleChangeLang} type="checkbox" name="it" value="Italian" />
              <div className="checkmark" style={{backgroundImage: `url(${itIcon})`}}></div>
              <p>Italian</p>
            </label>
          </div>
        </div>
        
        {/* Flashcards Creation */}
        <div className='flex-r g10 justify-start w-100'>
          {flashcardsList.map((flashcard,index)=>{
          return(
            <div key= {`flash-${index}`} id="flashcard-item">
              <h5>{flashcard.cardName}</h5>
            </div>
          )
          })}
          <div onClick={()=>{setIsCreating(!isCreating)}} id="flashcard-item-add">
            <h2>+</h2>
          </div>
        </div>
        {isCreating && <FlashcardCreate setIsCreating={setIsCreating} newFlashcard={newFlashcard} setNewFlashcard={setNewFlashcard} setFlashcardsList={setFlashcardsList}/>}
        

    </div>
  );
}

export default DeckCreate;