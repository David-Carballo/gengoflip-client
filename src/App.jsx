import { Route, Routes } from 'react-router-dom'
import './styles/App.css'
import { useContext, useState } from 'react'

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
import DeckLearn from './pages/private/DeckLearn'


import { AuthContext } from './context/auth.context'
import Sidebar from './components/Sidebar'


function App() {
  const {isLoggedIn} = useContext(AuthContext)

  return (
    <div id="app" className={"theme"}>  
      {!isLoggedIn && <Navbar/>}
      {isLoggedIn && <Sidebar/>}
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
        <Route path="/decks/:deckId/learn" element={<Private><DeckLearn/></Private>}/>
      </Routes>
      {/* {!isLoggedIn && <Footer/>} */}
      

    </div>
  )
}

export default App
