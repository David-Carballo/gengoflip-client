import enIcon from "../assets/en.png"
import esIcon from "../assets/es.png"
import frIcon from "../assets/fr.png"
import deIcon from "../assets/de.png"
import ptIcon from "../assets/pt.png"
import itIcon from "../assets/it.png"
import savedIcon from "../assets/bookmark.svg"
import flashIcon from "../assets/flashcard.svg"

function Deck({deck}) {

  const {deckName, flashcards, languages, savedCount, tags, imageUrl} = deck;

  return(
    <div id="deck-card">
      <img src={imageUrl} alt="deck image"/> 
      <div className="flex-c">
        <p>{deckName}</p>
        {tags.map((tag,index) => {

        return (<label key={`tag-${index}`} id="deck-tags">{tag}</label>)
        }
        )}
        <br/>
        <div className="flex-r">
          <div className="flex-r">
            <p>{flashcards.length}</p>
            <img src={flashIcon} alt="saved icon" />
          </div>
          <div className="flex-r">
            <p>{savedCount}</p>
            <img src={savedIcon} alt="saved icon" />
          </div>
        </div>
      </div>
      <div className="flex-c justify-start g10">
        {languages.map((language,index)=>{
          if(language==="English") return(<img key={language} src={enIcon}/>)
          else if(language==="Spanish") return(<img key={language} src={esIcon}/>)
          else if(language==="French") return(<img key={language}src={frIcon}/>)
          else if(language==="German") return(<img key={language} src={deIcon}/>)
          else if(language==="Portuguese") return(<img key={language}src={ptIcon}/>)
          else if(language==="Italian") return(<img key={language} src={itIcon}/>)
        })}
      </div>

    </div>
  );
}

export default Deck;