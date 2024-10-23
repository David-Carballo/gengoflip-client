import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css'
import { useEffect, useState } from 'react';
import bg1 from '../../assets/panel1.png'
import service from '../../services/config';

function Dashboard() {

  const navigate = useNavigate();

  useEffect(()=>{
    getMostRated();
  }
  ,[])

  const getMostRated = async () => {
    try {
      const response = await service.get(`${import.meta.env.VITE_SERVER_URL}/api/decks/`)
      console.log(response.data.slice(0,5));
      setMostDecks(response.data.slice(0,5));
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleEnterSearch = (e) => {
    if(e.key === 'Enter') {
      navigate(`/library?search=${e.target.value}`)
    }
  }
  const handleCreate = (e) => {
    e.preventDefault();
    navigate("/decks/create");
  }

  const [searchValue, setSearchValue] = useState("");
  const [mostDecks, setMostDecks] = useState(null);

  if(!mostDecks) return <h3>Loading...</h3>

  return(
    <div id="dashboard" className='flex-c g20'>

      <div id="dashboard-bar" className='flex-r justify-between g20 w-80'>
        <input onChange={(e)=>setSearchValue(e.target.value)} onKeyDown={handleEnterSearch} value={searchValue} placeholder={`Search decks...`} className='w-50'/>
        <button onClick={handleCreate}>+ Create Deck</button>
      </div>

      <Link to="/library" id="dashboard-panel">
        <h2>Learn now!</h2>
      </Link>

      <div  className='w-80'>
        <div className='flex-r justify-between'>
          <p>Most rated</p>
          <Link to="/library" className='flex-r justify-start'>See all</Link>
        </div>
        <div id="dashboard-most" className='flex-r justify-around'>
          {mostDecks.map((deck,index)=>{
            return(
              <Link to={`/decks/${deck._id}`} key={index} className='most-container'>
                <img src={deck.imageUrl} alt="deck image" />
                <h5>{deck.deckName}</h5>
              </Link>
            )
          })}
        </div>
      </div>

      <div id="dashboard-profile" className='w-80'>
        <Link to="/profile" className='flex-r justify-end'>Profile</Link>
        <div style={{height: "100px", backgroundColor: "var(--light-color)"}}>
          <div className="flex-r justify-around">
            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="profile-img"/>
            
            <div className='flex-c w-80'>
              <h3 className="w-100">Username</h3>
              <p>Decks completed: 15/20</p>
              <p>Decks in Progress: 15/20</p>
              <p>Decks to do: 15/20</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;