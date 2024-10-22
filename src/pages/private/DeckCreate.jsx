import { useState } from 'react';
import '../../styles/Deck.css'
import service from '../../services/config';
import { useNavigate } from 'react-router-dom';
import FlashcardCreate from '../../components/FlashcardCreate';

function DeckCreate() {

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

      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, {deckId: response.data._id})
      navigate(`/decks/${response.data._id}`);
    } 
    catch (error) {
      console.log(error);
    }
  }
  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!e.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    // setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", e.target.files[0]);

    try {
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)
      const response = await service.post(`${import.meta.env.VITE_SERVER_URL}/api/uploads`, uploadData)
      console.log(response.data.imageUrl);
      setImageUrl(response.data.imageUrl);
      // setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      // setIsUploading(false); // to stop the loading animation
    } 
    catch (error) {
      console.log(error);
    }
  }


  return(
    <div id="deck-create" className='flex-r'>
      <div id="create-form" className='flex-c g20'>
        <h2>Create new Deck</h2>
        {/* Image + title */}
        <div className="flex-r w-100 justify-between">
          <div id="profile-img">
            <div id="upload-btn">
              <input id="input-btn" type="file" name="imageUrl" onChange={handleFileUpload}/> 
            </div>
            <img src={imageUrl} alt="deck image" hidden={!imageUrl}/>
          </div>
          <input onChange={handleName} placeholder="Title" type="text" name="name" value={deckName}/>
        </div>

        {/* List of generated tags */}
        <div className='flex-r g10 w-100'>
          {tagsList.map((tag,index) => {
              return (<label key={`tag-${index}`} id="deck-tags">{tag}</label>)
            }
          )}
        </div>
        {/* Description */}
        <textarea onChange={handleDesc} placeholder="Write here the deck's description..." className="w-100" type="text" name="description" rows="3" value={description}/>
        {/* Tags */}
        <div className='flex-r w-100 justify-start'>
          <div className='flex-r g10'>
            <input onChange={handleTag} placeholder="Add new tags..." type="text" name="tags" value={tag}/>
            <button onClick={handleTagList}>+</button>
          </div>
        </div>
        
        {/* Languages select */}
        {/*//TODO Update languages with Flashcards value / Permitir solo estos languages en flashcards */}
        <div className='flex-c align-start'>
          <p>What languages ​​does your deck support?</p>
          <div id="languages-checkbox" className='flex-r wrap w-100 g10'>
            <div name="English">
              <input onChange={handleChangeLang} type="checkbox" name="en" value="English"/>
              <label>English</label>
            </div>
            <div>
              <input onChange={handleChangeLang} type="checkbox" name="es" value="Spanish" />
              <label>Spanish</label>
            </div>
            <div>
              <input onChange={handleChangeLang} type="checkbox" name="fr" value="French" />
              <label>French</label>
            </div>
            <div>
              <input onChange={handleChangeLang} type="checkbox" name="de" value="German" />
              <label>German</label>
            </div>
            <div>
              <input onChange={handleChangeLang} type="checkbox" name="pt" value="Portuguese" />
              <label>Portuguese</label>
            </div>
            <div>
              <input onChange={handleChangeLang} type="checkbox" name="it" value="Italian" />
              <label>Italian</label>
            </div>
          </div>
        </div>
        
        {/* Flashcards Creation */}
        <div className='flex-r g10 justify-start w-100'>
          {flashcardsList.map((flashcard,index)=>{
          return(
            <div key= {`flash-${index}`} id="flashcard-container">
              <p>{flashcard.cardName}</p>
            </div>
          )
          })}
          <div id="container-create" onClick={()=>{setIsCreating(!isCreating)}}>
            <p>+</p>
          </div>
        </div>
        {isCreating && <FlashcardCreate setIsCreating={setIsCreating} newFlashcard={newFlashcard} setNewFlashcard={setNewFlashcard} setFlashcardsList={setFlashcardsList}/>}
        
        
        <div className='flex-r g20'>
          <button>Discard</button>
          <button onClick={handleCreate}>Create</button>
        </div>

      </div>

    
    </div>
  );
}

export default DeckCreate;