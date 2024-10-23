import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import FlashcardDetails from "../../components/FlashcardDetails";
import enIcon from "../../assets/en.png"
import esIcon from "../../assets/es.png"
import frIcon from "../../assets/fr.png"
import deIcon from "../../assets/de.png"
import ptIcon from "../../assets/pt.png"
import itIcon from "../../assets/it.png"
import editBtn from "../../assets/dot-options.svg"
import FlashcardCreate from "../../components/FlashcardCreate";

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
      setFlashcardsList(response.data.flashcards)
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  //States
  const [deckDetails, setDeckDetails] = useState(null)
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [dropMenu, setDropMenu] = useState(-1);
  const [isCreating, setIsCreating] = useState(-1)
  const [isAdding, setIsAdding] = useState(false)
  
  const [newFlashcard, setNewFlashcard] = useState({
    cardName: "",
    description: "",
    originalLang: "",
    translations: [],
    imageUrl: ""
  })
  const [flashcardsList, setFlashcardsList] = useState([]);
  
  useEffect(() => {
  }, [deckDetails]);

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
    setTagsList(newTags)
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
  //Handle delete tag
  const handleDeleteTag = (e) => {
    e.preventDefault();
    const newTags = [...deckDetails.tags];
    //Si el lenguaje estaba incluido en el estado eliminarlo
    let index = newTags.indexOf(e.target.name)
    if(index > -1) newTags.splice(index, 1)
    const deckClone = structuredClone(deckDetails);
    deckClone.tags = newTags;
    setDeckDetails(deckClone);
    setTagsList(newTags);
  }
  //Handle drop menu to edit and delete flashcard
  const handleDropMenu = (index) => {
    if(dropMenu === index) setDropMenu(-1);
    else setDropMenu(index);
  }
  //Handle delete flashcard from desk
  const handleDeleteFlashcard = (index) => {
    const flashIds = [...deckDetails.flashcards];
    flashIds.splice(index, 1)
    const deckClone = structuredClone(deckDetails);
    deckClone.flashcards = flashIds;
    console.log(deckClone)
    setDeckDetails(deckClone);
    setFlashcardsList(flashIds);
  }
  //Handle add flashcard to desk
  const handleAddNewFlashcard = (e) => {
    e.preventDefault();
    setIsAdding(!isAdding);
  }

  //Call to Update changes of this deck
  const handleSave = async (e) => {
    e.preventDefault();
    const updatedDeck = structuredClone(deckDetails);
    updatedDeck.tags = tagsList;
    updatedDeck.flashcards = flashcardsList.map((e)=>e._id);
    try {
      const response = await service.put(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`, updatedDeck);
      navigate(`/decks/${params.deckId}`);
    } 
    catch (error) {
      console.log(error);
    }
  }
  //Call to Delete this deck
  const handleDelete = async (e) => {
    e.preventDefault();
    
    try {
      const ids = flashcardsList.map((e)=>e._id);
      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/many`, {ids : ids});
      
      await service.delete(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`);

      await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/remove-deck`, {deckId: params.deckId})

      navigate("/profile/library");
    } 
    catch (error) {
      console.log(error);  
    }
  }

  //Upload image
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

  if(!deckDetails) return <h1>...Loading</h1>

  return(
    <div id="deck-edit" className="flex-c g20 w-100 justify-between align-start">
      <h2>Edit deck</h2>
        {/* Image + title */}
        <div className="flex-r w-100 justify-start g50">
          <div id="profile-img">
            <div id="upload-btn">
              <input id="input-btn" type="file" name="image" onChange={handleFileUpload}/> 
            </div>
            <img src={deckDetails.imageUrl} alt="deck image" hidden={!deckDetails.imageUrl}/>
          </div>
          <input onChange={handleChange} placeholder="Title" type="text" name="name" value={deckDetails.deckName}/>
        </div>
       
        
        {/* List of generated tags */}
        <div className="flex-r wrap g10 w-100">
          {deckDetails.tags.map((tag,index) => {
            return (
              <div key={`tag-${index}`} id="deck-tags">
                <button onClick={handleDeleteTag} name={tag}>❌</button>
                <label id="tag">{tag}</label>
              </div>
            )}
          )}
          <div className='flex-r w-50 justify-start'>
            <div className='flex-r g10'>
              <input onChange={handleTag} placeholder="Add new tags..." type="text" name="tags" value={tag}/>
              <button onClick={handleTagList}>+</button>
            </div>
          </div>
        </div>
        
         {/* Description */}
         <textarea onChange={handleChange} placeholder="Write here the deck's description..." className="w-100" type="text" name="description" rows="3" value={deckDetails.description}/>

        <p>What languages ​​does your deck support?</p>
        <div id="languages-checkbox" className='flex-r wrap w-100 g10'>
          <label className="container flex-r g10">
            <input onChange={handleChangeLang} type="checkbox" name="en" value="English" checked={deckDetails.languages.includes("English")}/>
            <div className="checkmark" style={{backgroundImage: `url(${enIcon})`}}></div>
            <p>English</p>
          </label>
          <label className="container flex-r g10">
            <input onChange={handleChangeLang} type="checkbox" name="es" value="Spanish" checked={deckDetails.languages.includes("Spanish")}/>
            <div className="checkmark" style={{backgroundImage: `url(${esIcon})`}}></div>
            <p>Spanish</p>
          </label>
          <label className="container flex-r g10">
            <input onChange={handleChangeLang} type="checkbox" name="fr" value="French" checked={deckDetails.languages.includes("French")}/>
            <div className="checkmark" style={{backgroundImage: `url(${frIcon})`}}></div>
            <p>French</p>
          </label>
          <label className="container flex-r g10">
            <input onChange={handleChangeLang} type="checkbox" name="de" value="German" checked={deckDetails.languages.includes("German")}/>
            <div className="checkmark" style={{backgroundImage: `url(${deIcon})`}}></div>
            <p>German</p>
          </label>
          <label className="container flex-r g10">
            <input onChange={handleChangeLang} type="checkbox" name="pt" value="Portuguese" checked={deckDetails.languages.includes("Portuguese")}/>
            <div className="checkmark" style={{backgroundImage: `url(${ptIcon})`}}></div>
            <p>Portuguese</p>
          </label>
          <label className="container flex-r g10">
            <input onChange={handleChangeLang} type="checkbox" name="it" value="Italian" checked={deckDetails.languages.includes("Italian")}/>
            <div className="checkmark" style={{backgroundImage: `url(${itIcon})`}}></div>
            <p>Italian</p>
          </label>
        </div>

        <p>Flashcards</p>
        {/* Flashcards Creation */}
        {isAdding && <FlashcardCreate setIsCreating={setIsAdding} newFlashcard={newFlashcard} setNewFlashcard={setNewFlashcard} setFlashcardsList={setFlashcardsList}/>}
        {/* {deckDetails.flashcards.map((fc,index)=><FlashcardDetails key={`fc-${index}`} flashId={fc._id} setDeckDetails={setDeckDetails}/>)} */}
        <div id="flashcards-container" className="flex-r wrap justify-start w-100">
          <div onClick={handleAddNewFlashcard} id="flashcard-item-add">
            <h2>+</h2>
          </div>
          {flashcardsList.map((fc,index)=>{
            return(
              <div id="flashcard-item" key={`fc-${index}`} style={{position: "relative"}}>
                {<div id="drop-menu" hidden={!(dropMenu === index)} >
                  <p onClick={()=>setIsCreating(index)}>Edit</p>
                  <hr/>
                  <p onClick={()=>handleDeleteFlashcard(index)}>Delete</p>
                </div>}
                <div>
                  <img onClick={()=>handleDropMenu(index)} id="edit-btn" src={editBtn} alt="edit button" />
                  {/* <img src={flashcard.imageUrl} alt="flashcard image" /> */}
                  {/* <img src={fc.imageUrl} alt="flashcard image" /> */}
                  <h5>{fc.cardName}</h5>
                </div>
              </div>
            )
          })}
        </div>

        {isCreating>=0 && <FlashcardDetails flashId={deckDetails.flashcards[isCreating]._id} setDeckDetails={setDeckDetails} setIsCreating={setIsCreating} handleDropMenu={handleDropMenu}/>}

        <div className="flex-r g20">
          <button onClick={handleSave}>Save changes</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
}

export default DeckEdit;