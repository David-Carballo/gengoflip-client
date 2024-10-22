import { useState } from "react";
import service from "../services/config";
import '../styles/Flashcard.css';
import enIcon from "../assets/en.png"
import esIcon from "../assets/es.png"
import frIcon from "../assets/fr.png"
import deIcon from "../assets/de.png"
import ptIcon from "../assets/pt.png"
import itIcon from "../assets/it.png"

function FlashcardCreate({setIsCreating, newFlashcard, setNewFlashcard, setFlashcardsList}) {

  const [translation, setTranslation] = useState({lang:"English", translatedName:"", translatedDescription:""});
  const [translationsList, setTranslationsList] = useState([]);
  
  //Handle functions
  const handleChangeFlashcard = (e) => {
    const clone = structuredClone(newFlashcard);
    clone[e.target.name] = e.target.value;
    setNewFlashcard(clone);
  }
  const handleChangeLang = (e) => {
    const transClone = structuredClone(translation);
    transClone[e.target.name] = e.target.value;
    setTranslation(transClone);
  }
  const handleAddLang = (e) => {
    e.preventDefault();
    setTranslationsList([...translationsList, translation]);
    // setTranslation({lang:"", translatedName:"", translatedDesc:""});
  }
  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      const clone = structuredClone(newFlashcard);
      clone.translations = translationsList;
      setNewFlashcard(clone);
      
      const response = await service.post(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/`, clone);
      
      setFlashcardsList(current => [...current,response.data])

      setTranslation({lang:"English", translatedName:"", translatedDescription:""});
      setIsCreating(false);
    } 
    catch (error) {
      console.log(error);
    }
  }
  const handleCloseCreate = (e) => {
    e.preventDefault();
    setIsCreating((current)=>!current);
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
      const clone = structuredClone(newFlashcard);
      clone.imageUrl = response.data.imageUrl;
      console.log(clone);
      setNewFlashcard(clone);
      // setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      // setIsUploading(false); // to stop the loading animation
    } 
    catch (error) {
      console.log(error);
    }
  }

  //Aux functions
  const getFlag = (lang) => {
    if(lang === "English") return enIcon;
    else if(lang === "Spanish") return esIcon
    else if(lang === "French") return frIcon
    else if(lang === "German") return deIcon
    else if(lang === "Portuguese") return ptIcon
    else if(lang === "Italian") return itIcon
  }
 
  return(
    <div id="flashcard-bg" className="flex-r center">
      <div id="flashcard-create" className="flex-c g10"> 
        <div className="w-100 flex-r justify-end">
          <button onClick={handleCloseCreate}>X</button>
        </div>
        <div className="flex-r w-100 g20">
          <div id="profile-img">
            <div id="upload-btn">
              <input id="input-btn" type="file" name="imageUrl" onChange={handleFileUpload}/> 
            </div>
            <img src={newFlashcard.imageUrl} alt="flashcard image" hidden={!newFlashcard.imageUrl}/>
          </div>
          <input onChange={handleChangeFlashcard} placeholder="Name" type="text" name="cardName" value={newFlashcard.cardName}/>
        </div>
        {/* <div className="flex-c align-center w-100">
          <textarea onChange={handleChangeFlashcard} className="w-100" placeholder="Write here the flashcard's description..."type="text" name="description" rows="3" value={newFlashcard.description}/>
        </div> */}
        <div className="flex-r justify-start w-100 g20">
          <label>Original Language</label>
          <select onChange={handleChangeFlashcard} value={newFlashcard.originalLang} name="originalLang" required>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Italian">Italian</option>
          </select>
        </div>
        <div className="flex-c g10 align-start w-100">
          {translationsList.map((trans,index) =>{
            return(
              <div className="flex-r g10">
                <img src={getFlag(trans.lang)} alt="language flag" className="flags"/>
                <p key={index}>{trans.translatedName}</p>
              </div>
            )
          })}
        </div>
        <div id="new-translation" className="flex-c justify-around align-start w-100">
          <label>Add translation: </label>
          <div className="flex-r justify-start w-100 g20">
            <select onChange={handleChangeLang} name="lang" value={translation.lang} required>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Italian">Italian</option>
            </select>
            <input onChange={handleChangeLang} placeholder="Name" type="text" name="translatedName" value={translation.translatedName}/>
            <button onClick={handleAddLang}>+</button>
          </div>
          {/* <div className="w-100">
            <div className="flex-c g10 align-start w-100">
              <textarea onChange={handleChangeLang} className="w-100" placeholder="Description" type="text" name="translatedDescription" value={translation.translatedDescription}/>
            </div>
          </div> */}
        </div>
        <button id="add-btn" onClick={handleAddFlashcard} disabled={!translationsList.length}>Add</button>
      </div>

    </div>
  );
}

export default FlashcardCreate;