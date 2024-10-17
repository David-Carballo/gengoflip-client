import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useContext } from 'react'

import Navbar from './components/Navbar'
import Private from './components/Private'
import Footer from './components/Footer'

import Home from './pages/public/Home'
import Signup from './pages/public/Signup'
import Login from './pages/public/Login'
import Contact from './pages/public/Contact'

import Dashboard from './pages/private/Dashboard'
import Profile from './pages/private/Profile'
import ProfileLibrary from './pages/private/ProfileLibrary'
import Library from './pages/private/Library'
import DeckDetails from './pages/private/DeckDetails'
import DeckCreate from './pages/private/DeckCreate'
import DeckEdit from './pages/private/DeckEdit'

import { AuthContext } from './context/auth.context'


function App() {
  const {isLoggedIn} = useContext(AuthContext)

  return (
    <>  
      {!isLoggedIn && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<Private><Dashboard/></Private>}/>
        <Route path="/profile" element={<Private><Profile/></Private>}/>
        <Route path="/profile/library" element={<Private><ProfileLibrary/></Private>}/>
        <Route path="/library" element={<Private><Library/></Private>}/>
        <Route path="/decks/:deckId" element={<Private><DeckDetails/></Private>}/>
        <Route path="/decks/create" element={<Private><DeckCreate/></Private>}/>
        <Route path="/decks/:deckId/edit" element={<Private><DeckEdit/></Private>}/>
      </Routes>
      <Footer/>

    </>
  )
}

export default App
