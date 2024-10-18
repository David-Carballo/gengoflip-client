import { useState } from "react";
import service from "../services/config";

function FlashcardCreate({newFlashcard, setNewFlashcard, setFlashcardsList}) {

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
    } 
    catch (error) {
      console.log(error);
    }
  }

  return(
    <div id="flashcard-create" style={{backgroundColor: "var(--green20-color)"}}>
        <label>Name</label>
        <input onChange={handleChangeFlashcard} type="text" name="cardName" value={newFlashcard.cardName}/>
        <label>Description</label>
        <input onChange={handleChangeFlashcard} type="text" name="description" value={newFlashcard.description}/>
        <label>Original Language</label>
        <select onChange={handleChangeFlashcard} value={newFlashcard.originalLang} name="originalLang" required>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Italian">Italian</option>
        </select>
        {translationsList.map((trans,index) => <p key={index}>{trans.lang}</p>)}
        <br/>
        <br/>
        <div style={{backgroundColor: "var(--green10-color)"}}>
          <label>New Translation: </label>
          <select onChange={handleChangeLang} name="lang" value={translation.lang} required>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Italian">Italian</option>
          </select>
          <label>Name</label>
          <input onChange={handleChangeLang} type="text" name="translatedName" value={translation.translatedName}/>
          <label>Description</label>
          <input onChange={handleChangeLang} type="text" name="translatedDescription" value={translation.translatedDescription}/>
          <button onClick={handleAddLang}>+</button>
        </div>
        <br/>
        <br/>
      <button onClick={handleAddFlashcard} disabled={!translationsList.length}>Add</button>
    </div>
  );
}

export default FlashcardCreate;