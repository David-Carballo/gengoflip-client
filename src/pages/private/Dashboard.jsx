import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css'
import searchIcon from '../../assets/search.svg'

function Dashboard() {
  return(
    <div id="dashboard" className='flex-c'>

      <div id="dashboard-bar" className='flex-r justify-center g20'>
        <input value={`Search decks...`} disabled/>
        <Link to="/decks/create">+Create</Link>
      </div>

      <div id="dashboard-panel">

      </div>

      <div id="dashboard-most" className='w-80'>
        <div className='flex-r justify-between'>
          <p>Most rated</p>
          <Link to="/library" className='flex-r justify-start'>See all</Link>
        </div>
        <div style={{height: "100px", backgroundColor: "var(--green20-color)"}}>
        </div>
      </div>

      <div id="dashboard-profile" className='w-80'>
        <Link to="/profile" className='flex-r justify-end'>Profile</Link>
        <div style={{height: "100px", backgroundColor: "var(--green20-color)"}}>
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