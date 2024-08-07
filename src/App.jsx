import { useState } from 'react'
import Home from './components/Home/Home'
import PlayGround from './components/PlayGround/PlayGround'

import HomeContext from './contexts/HomeContext'

import '/src/fonts/fonts.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [userName, setUserName] = useState('GUEST')  // Can be used to change initial username

  return (
    <>
      <HomeContext.Provider value={{userName, setUserName}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/playground' element={<PlayGround />} ></Route>
          </Routes>
        </BrowserRouter>
      </HomeContext.Provider>
    </>
  )
}

export default App
