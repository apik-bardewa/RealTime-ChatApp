import React from 'react'
// import Nav from './pages/Nav'
// import Hero from './pages/Hero'
import { Routes,Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Signout from './pages/Signout'
import Profile from './pages/Profile'
import Home from './pages/Home'
import getCurrentUser from './pages/customHooks/getCurrentUser.jsx'
// import Afterlogin from './pages/Afterlogin.jsx'
import Profilechat from './pages/Profilechat.jsx'


function App() {
  getCurrentUser();
  return (
    <div>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signout' element={<Signout/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Profilechat/>}/>

        </Routes>
    </div>
  )
}

export default App