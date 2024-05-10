import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Employementlist from './Components/Employementlist'
import Admin from './Components/Admin'
import Register from './Components/Register'
import Login from './Components/Login'



function App() {
 

  return (
    <div>
      <Navbar/>
      <Routes>
        
      <Route path='/home' element={<Home/>}/>
      <Route path='/employee' element={<Employementlist/>}/>
      <Route path='/' element={<Admin/>}/>
    <Route path='/registers' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
