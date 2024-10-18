import { useState } from "react";

function FlashcardCreate({newFlashcard, setNewFlashcard, setFlashcards}) {

  const [translation, setTranslation] = useState({lang:"English", translatedName:"", translatedDesc:""});
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
  const handleAddFlashcard = (e) => {
    e.preventDefault();
    const clone = structuredClone(newFlashcard);
    clone.translations = translationsList;
    setNewFlashcard(clone);
    console.log(clone);
    setTranslation({lang:"English", translatedName:"", translatedDesc:""});
    setFlashcards(current => [...current,clone])
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
        {translationsList.map(trans => <p>{trans.lang}</p>)}
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
          <input onChange={handleChangeLang} type="text" name="translatedDesc" value={translation.translatedDesc}/>
          <button onClick={handleAddLang}>+</button>
        </div>
        <br/>
        <br/>
      <button onClick={handleAddFlashcard} disabled={!translationsList.length}>Add</button>
    </div>
  );
}

export default FlashcardCreate;