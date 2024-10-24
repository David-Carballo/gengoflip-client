import { useEffect, useState } from "react";
import service from "../services/config";
import '../styles/Flashcard.css';
import enIcon from "../assets/en.png"
import esIcon from "../assets/es.png"
import frIcon from "../assets/fr.png"
import deIcon from "../assets/de.png"
import ptIcon from "../assets/pt.png"
import itIcon from "../assets/it.png"
import { RotatingSquare } from 'react-loader-spinner'

function FlashcardDetails({flashId, setDeckDetails, setIsCreating, handleDropMenu}) {

  useEffect(()=>{
    getFlashcardData();
  }
  ,[])

  //Get details of this flashcard
  const getFlashcardData = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/${flashId}`)
      console.log(response.data)
      setFlashcardData(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  }
  //Change to edit Mode
  const handleEditMode = (e) => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }
  
  const [flashcardData, setFlashcardData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  //Change values of this flashcard
  const handleChange = (e) => {
    const clone = structuredClone(flashcardData);
    clone[e.target.name] = e.target.value;
    setFlashcardData(clone)
  }
  //Call to Add new flashcard to db
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await service.put(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/${flashId}`, flashcardData,{new: true});
      console.log(response.data);
      setIsEditMode(false);
    } 
    catch (error) {
      console.log(error);  
    }
  }
  //Call to Delete this flashcard
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      console.log(flashId);
      await service.delete(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/${flashId}`);
      setDeckDetails((current) => {
        const clone = structuredClone(current);
        clone.flashcards.splice(clone.flashcards.indexOf(flashId),1);
        return clone;
      })
    } 
    catch (error) {
      console.log(error)  
    }
  }

  const handleCloseCreate = (e) => {
    e.preventDefault();
    setIsCreating(-1);
    handleDropMenu(-1)
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

  if(!flashcardData) return (
    <div className="loading flex-c">
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        strokeWidth="5"
        color="rgb(64, 126, 54)"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{borderRadius: "10px"}}
        wrapperClass=""
      />
    </div>
  )

  return(
    <div id="flashcard-bg" className="flex-r center">
      <div id="flashcard-details" className="flex-c g10">
        <div className="w-100 flex-r justify-end">
          <button onClick={handleCloseCreate}>X</button>
        </div>
        <div className="flex-r w-100 g20">
          <div id="profile-img">
            <div id="upload-btn" hidden={!isEditMode}>
              <input id="input-btn" type="file" name="imageUrl" onChange={handleFileUpload} /> 
            </div>
            <img src={flashcardData.imageUrl} alt="flashcard image" hidden={!flashcardData.imageUrl}/>
          </div>
          <input onChange={handleChange} placeholder="Name" type="text" name="cardName" value={flashcardData.cardName} disabled={!isEditMode}/>
        </div>
        {/* <div className="flex-c align-center w-100">
          <textarea onChange={handleChange} className="w-100" placeholder="No description"type="text" name="description" rows="3" value={flashcardData.description} disabled={!isEditMode}/>
        </div> */}
        <div className="flex-r justify-start w-100 g10">
          <label>Original Language</label>
          <select onChange={handleChange} value={flashcardData.originalLang} name="originalLang" required disabled={!isEditMode}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Italian">Italian</option>
          </select>
        </div>
        <div className="flex-c g10 align-start w-100">
          {flashcardData.translations.map((trans,index) =>{
            return(
              <div className="flex-r g10" key={index}>
                <img src={getFlag(trans.lang)} alt="language flag" className="flags"/>
                <p key={index}>{trans.translatedName}</p>
              </div>
            )
          })}
        </div>
        <div id="new-translation" className="flex-c align-start g10 w-100">
          <label>Add translation: </label>
          <div className="flex-r justify-start w-100 g20">
            <select onChange={handleChange} name="lang" value={flashcardData.translations[0].lang} required disabled={!isEditMode}>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Italian">Italian</option>
            </select>
            <input onChange={handleChange} placeholder="Name" type="text" name="translatedName" value={flashcardData.translations[0].translatedName} disabled={!isEditMode}/>
          </div>
          <div className="w-100">
            <div className="flex-c g10 align-start w-100">
            {/* <textarea onChange={handleChange} className="w-100" placeholder="Description" type="text" name="translatedDescription" value={flashcardData.translations[0].translatedDescription} disabled={!isEditMode}/> */}
            </div>

          </div>
        </div>


        <div className="flex-r g10">
          {/* {isEditMode && <button onClick={handleEditMode}>Back</button>} */}
          {<button onClick={handleEditMode}>{isEditMode? "Discard": "Edit"}</button>}
          {isEditMode && <button onClick={handleSave}>Save</button>}
          {<button onClick={handleDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
}

export default FlashcardDetails;