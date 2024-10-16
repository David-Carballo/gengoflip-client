import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Private from './components/Private'

function App() {

  return (
    <>  
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/contact" element={<Private><Contact/></Private>}/>
        {/* <Route path="/private-page-example" element={ <Private> <PrivatePageExample /> </Private> } /> */}
      </Routes>
    </>
  )
}

export default App
