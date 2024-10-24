import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../styles/DeckDetails.css'
import service from "../../services/config";
import enIcon from "../../assets/en.png"
import esIcon from "../../assets/es.png"
import frIcon from "../../assets/fr.png"
import deIcon from "../../assets/de.png"
import ptIcon from "../../assets/pt.png"
import itIcon from "../../assets/it.png"
import editIcon from "../../assets/edit.svg"
import savedIcon from "../../assets/bookmark.svg";
import flashIcon from "../../assets/flashcard.svg"
import { AuthContext } from "../../context/auth.context";
import { RotatingSquare } from 'react-loader-spinner'
import Notification from "../../components/Notification";

function DeckDetails() {

  const navigate = useNavigate();
  const {deckId} = useParams();
  const [deckDetails, setDeckDetails] = useState(null);
  const [isOwner, setIsOwner] = useState(false)
  const {loggedUserId} = useContext(AuthContext);

  useEffect(()=>{
    getDeckDetails();
    // getUserLibrary();
  },[])
  
  useEffect(()=>{
    if(deckDetails) checkOwner();
  }, [deckDetails])

  const getDeckDetails = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/${deckId}`);
      setDeckDetails(response.data)
    } 
    catch (error) {
      navigate("/error")
    }
  }

  const handleLearn = () => {
    navigate(`/decks/${deckDetails._id}/learn`)
  }

  const checkOwner = () => {
    if(deckDetails.owner._id === loggedUserId) setIsOwner(true);
  }

  if(!deckDetails) return (
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
    <div id="deck-details" className="flex-c g20 justify-start align-start">
      <Notification/>
      {/* GENERAL INFO */}
      <div id="deck-info" className="flex-r align-start h-100 g20 w-100">
        <img src={deckDetails.imageUrl} className="deck-img" alt="deck image"/>
        {/* title and info */}
        <div className="flex-c justify-between align-start h-100 w-100">
          <h4>{deckDetails.deckName}</h4>
          {/* DESCRIPTION */}
          <p>{deckDetails.description}</p>
          <br />
          <div className="flex-r justify-between w-100">
            <div className="flex-r g20">
              <div className="flex-r">
                <p>{deckDetails.flashcards.length}</p>
                <img src={flashIcon} alt="saved icon" />
              </div>
              <div className="flex-r">
                <p>{deckDetails.savedCount}</p>
                <img src={savedIcon} alt="saved icon" />
              </div>
              {/* languages */}
              <div className="flex-r  h-100 g10">
                {deckDetails.languages.map((language)=>{
                  if(language==="English") return(<img key={language} src={enIcon}/>)
                  else if(language==="Spanish") return(<img key={language} src={esIcon}/>)
                  else if(language==="French") return(<img key={language}src={frIcon}/>)
                  else if(language==="German") return(<img key={language} src={deIcon}/>)
                  else if(language==="Portuguese") return(<img key={language}src={ptIcon}/>)
                  else if(language==="Italian") return(<img key={language} src={itIcon}/>)
                })}
              </div>
            </div>
          </div>

          <div></div>
        </div>
        <div className="flex-r start">
          {isOwner && <Link to={`/decks/${deckId}/edit`}><img src={editIcon} alt="edit icon"/></Link>}
        </div>
      </div>

      
      <div className="flex-r justify-between w-100">
        {/* TAGS */}
        <div className="flex-r align-start g20">
          {deckDetails.tags.map((tag,index) => {
            return (<label key={`tag-${index}`} id="deck-tags"> {tag}</label>)
            })
          }
        </div>
        {/* BUTTON */}
        <button onClick={handleLearn} id="learn-btn">LEARN</button>
      </div>
      {/* FLASHCARDS */}
      {/* //TODO isEditMode & add [+] */}
      <div className="flex-r wrap g20 w-100">
        {deckDetails.flashcards.map((flashcard,index)=>{
          return(
            <div id="flashcard-item" key={index}>
              {flashcard.imageUrl && <img src={flashcard.imageUrl} alt="flashcard image" />}
              <h5>{flashcard.cardName}</h5>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default DeckDetails;