import React from 'react'
import Nav from './pages/Nav'
import Hero from './pages/Hero'
import { Routes,Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Signout from './pages/Signout'


function App() {
  return (
    
    <div>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signout' element={<Signout/>}/>
        </Routes>
    </div>
  )
}

export default App