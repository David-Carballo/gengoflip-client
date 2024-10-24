import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import '../../styles/DeckLearn.css'
import leftIcon from "../../assets/arrow-left.svg"
import rightIcon from "../../assets/arrow-right.svg"
import enIcon from "../../assets/en.png"
import esIcon from "../../assets/es.png"
import frIcon from "../../assets/fr.png"
import deIcon from "../../assets/de.png"
import ptIcon from "../../assets/pt.png"
import itIcon from "../../assets/it.png"
import { RotatingSquare } from 'react-loader-spinner'

function DeckLearn() {
  const {deckId} = useParams();
  const navigate = useNavigate()

  const [deckDetails, setDeckDetails] = useState(null);
  const [isFront, setIsFront] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [learnedFlashcard, setLearnedFlashcard] = useState(0);
  const [translation, setTranslation] = useState([]);
  const [animation, setAnimation] = useState("");

  useEffect(()=>{
    getDeckDetails();
    window.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('keydown', handleKeys);
    }
  }, [])

  useEffect(()=>{
    if(deckDetails && progressValue === deckDetails.flashcards.length) {
      handleFinishLearn();
      let timer = setTimeout(() => {
        navigate(`/decks/${deckDetails._id}`);
        clearTimeout(timer)
      }, 2000);
    }
  },[progressValue])


  const getDeckDetails = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/${deckId}`);
      setDeckDetails(response.data);
      setTranslation(response.data.flashcards[0].translations[0].lang)
    } 
    catch (error) {
      navigate("/error")
    }
  }

  //useCallback, mantiene funcion entre re-renders
  const handleKeys = useCallback((e) => {
    if(e.code === 'Space') setIsFront((current)=>!current);
    if(e.code === 'ArrowLeft') handleReview(e);
    if(e.code === 'ArrowRight') handleLearned(e);
  },[]);

  const handleFlip = (e) => {
    setIsFront(!isFront);
  }

  const handleReview = (e) => {
    e.preventDefault();
    setProgressValue(current=>current+1)
    setAnimation("left")
    let timer = setTimeout(()=>{
      setCurrentFlashcard(current=>current+1)
      setAnimation("")
      clearTimeout(timer);
    },[1000])
    
  }

  const handleLearned = (e) => {
    e.preventDefault();
    setProgressValue(current=>current+1)
    setLearnedFlashcard(current=>current+1)
    setAnimation("right")
    let timer = setTimeout(()=>{
      setCurrentFlashcard(current=>current+1)
      setAnimation("")
      clearTimeout(timer);
    },[1000])
  }

  const handleChangeLang = (e) => {
    setTranslation(e.target.value);
  }

  const handleFinishLearn = async () => {
    try {
      const response = await service.patch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/${deckDetails._id}`, {id : deckDetails._id, learnedFlashcard});
    } 
    catch (error) {
      navigate("/error")
    }
  }

  const getFlag = (lang) => {
    if(lang === "English") return enIcon;
    else if(lang === "Spanish") return esIcon
    else if(lang === "French") return frIcon
    else if(lang === "German") return deIcon
    else if(lang === "Portuguese") return ptIcon
    else if(lang === "Italian") return itIcon
  }

  if(!deckDetails ) return (
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
  
  if(progressValue === deckDetails.flashcards.length) return (
    <div className="loading flex-c g20">
      <h1 className="congrats">Congratulations!</h1>
      <h3>{learnedFlashcard} flashcards learned!</h3>
    </div>
  )

  return(
    <div id="deck-learn" onKeyDown={handleFlip} >
      <div id="deck-learn-container" className="flex-c g20">
        {/* language */}
        <div id="languages-select" className="flex-r">
          {deckDetails.languages.filter(lang=>lang!=deckDetails.flashcards[0].originalLang)
          .map((lang,index)=>{
            return(
              <label key={index} className="container flex-r g10">
                <input onChange={handleChangeLang} type="checkbox" value={lang} checked={translation===lang}/>
                <div className="checkmark" style={{backgroundImage: `url(${getFlag(lang)})`}}></div> 
              </label>
            )
          })}
        </div>
        
        {/* title */}
        <h2>{deckDetails.deckName}</h2>
        {/* progress bar */}
        <div id="progress-bar" className="flex-r g10">
          <div id="progress" style={{width: `${(200/(deckDetails.flashcards.length)*progressValue)}px`}}></div>
        </div>
        {/* flashcard card + buttons*/}
        <div id="card-container" className="flex-r justify-center g20">
          <img onClick={handleReview} src={leftIcon} alt="left arrow" className="arrow-color"/>
          <div className="flip-card" onClick={handleFlip} swift={animation}>
            <div className={`${isFront? "flip" : null} flip-card-inner`} >
              <div className="flip-card-front flex-c g10 justify-around">
              {deckDetails.flashcards[currentFlashcard].imageUrl && <img src={deckDetails.flashcards[currentFlashcard].imageUrl} alt="flashcard image"/>}
                <h2>{deckDetails.flashcards[currentFlashcard].cardName}</h2>
              </div>
              <div className="flip-card-back flex-c g10 justify-around">
              {deckDetails.flashcards[currentFlashcard].imageUrl && <img src={deckDetails.flashcards[currentFlashcard].imageUrl} alt="flashcard image"/>}
              <h2>{deckDetails.flashcards[currentFlashcard].translations.filter(trans=>trans.lang===translation)[0].translatedName}</h2>
              </div>
            </div>
          </div>
          <img onClick={handleLearned} src={rightIcon} alt="right arrow" className="arrow-color"/>
        </div>
        {/* buttons */}
        <div id="buttons" className="flex-r g20">
          <div>
            <p> {"< "}Arrow Left</p>
            <button onClick={handleReview}>Review Later</button>
          </div>
          <div>
            <p>[Space]</p>
            <button onClick={handleFlip}>Flip</button>
          </div>
          <div>
            <p>Arrow Right{" >"}</p>
            <button onClick={handleLearned}>Learned</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeckLearn;