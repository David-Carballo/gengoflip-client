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
  const [dropMenu, setDropMenu] = useState(-1);
  const [isCreating, setIsCreating] = useState(-1)
  
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
  //Handle delete tag
  const handleDeleteTag = (e) => {
    e.preventDefault();
    const newTags = [...deckDetails.tags];
    //Si el lenguaje estaba incluido en el estado eliminarlo
    let index = newTags.indexOf(e.target.name)
    console.log(newTags);
    if(index > -1) newTags.splice(index, 1)
    console.log(index, newTags)
    const deckClone = structuredClone(deckDetails);
    deckClone.tags = newTags;
    setDeckDetails(deckClone);
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
  }
  //Handle open flashcard edit
  const handleOpenEditMode = () => {

  }

  //Call to Update changes of this deck
  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const response = await service.put(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`, deckDetails);
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
      await service.delete(`${import.meta.env.VITE_SERVER_URL}/api/decks/${params.deckId}`);
      navigate("/profile");
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


  if(!deckDetails) return <h1>...Loading</h1>

  return(
    <div id="deck-edit">
      <div id="create-form" className='flex-c g20'>
        {/* Image + title */}
        <div className="flex-r w-100 justify-between">
          <div id="profile-img">
            <div id="upload-btn">
              <input id="input-btn" type="file" name="image" onChange={handleFileUpload}/> 
            </div>
            <img src={deckDetails.imageUrl} alt="deck image" hidden={!deckDetails.imageUrl}/>
          </div>
          <input onChange={handleChange} placeholder="Title" type="text" name="name" value={deckDetails.deckName}/>
        </div>

        {/* Description */}
        <textarea onChange={handleChange} placeholder="Write here the deck's description..." className="w-100" type="text" name="description" rows="3" value={deckDetails.description}/>
        <div>
          <label>Tags</label>
          <input onChange={handleTag} type="text" name="tags" value={tag}/>
          <button onClick={handleTagList}>+</button>
        </div>
        {/* List of generated tags */}
        {deckDetails.tags.map((tag,index) => {
          return (
            <div key={`tag-${index}`}>
              <button onClick={handleDeleteTag} name={tag}>❌</button>
              <label id="deck-tags">{tag}</label>
            </div>
          )}
        )}

        <div id="languages-checkbox" >
          {/* <label><img src={enIcon} alt="english icon" /></label> */}
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
        {/* {deckDetails.flashcards.map((fc,index)=><FlashcardDetails key={`fc-${index}`} flashId={fc._id} setDeckDetails={setDeckDetails}/>)} */}
        <div className="flex-r wrap g20 w-100">
          {deckDetails.flashcards.map((fc,index)=>{
            return(
              <div id="flashcard-item" key={`fc-${index}`} style={{position: "relative"}}>
                {<div id="drop-menu" hidden={!(dropMenu === index)} >
                  <p onClick={()=>setIsCreating(index)}>Edit</p>
                  <hr/>
                  <p onClick={()=>handleDeleteFlashcard(index)}>Delete</p>
                </div>}
                <div >
                  <img onClick={()=>handleDropMenu(index)} id="edit-btn" src={editBtn} alt="edit button" />
                  {/* <img src={flashcard.imageUrl} alt="flashcard image" /> */}
                  <img src={fc.imageUrl} alt="flashcard image" />
                  <h5>{fc.cardName}</h5>
                </div>
              </div>
            )
          })}
        </div>

        {/* <button>+</button> */}
        {isCreating>=0 && <FlashcardDetails flashId={deckDetails.flashcards[isCreating]._id} setDeckDetails={setDeckDetails} setIsCreating={setIsCreating}/>}

        <div className="flex-r g20">
          <button onClick={handleSave}>Save changes</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeckEdit;