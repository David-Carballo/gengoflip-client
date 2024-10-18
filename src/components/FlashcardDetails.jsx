import { useEffect, useState } from "react";
import service from "../services/config";

function FlashcardDetails({flashId}) {

  useEffect(()=>{
    getFlashcardData();
  }
  ,[])

  const getFlashcardData = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/flashcards/${flashId}`)
      setFlashcardData(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  const [flashcardData, setFlashcardData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const clone = structuredClone(flashcardData);
    clone[e.target.name] = e.target.value;
    setFlashcardData(clone)
  }
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }
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

  if(!flashcardData) return(<h3>Loading...</h3>)

  return(
    <div id="flashcard-details" style={{backgroundColor: "var(--green10-color)"}}>
      <p>{flashId}</p>
      <label>Name</label>
      <input onChange={handleChange} type="text" name="cardName" value={flashcardData.cardName} disabled={!isEditMode}/>
      <label>Description</label>
      <input onChange={handleChange} type="text" name="description" value={flashcardData.description} disabled={!isEditMode}/>
      <label>Original Language</label>
      <input onChange={handleChange} type="text" name="originalLang" value={flashcardData.originalLang} disabled={!isEditMode}/>

      {isEditMode && <button onClick={handleSave}>Save</button>}
      {!isEditMode && <button onClick={handleEdit}>Edit</button>}
    </div>
  );
}

export default FlashcardDetails;