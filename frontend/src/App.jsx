// import { useState } from 'react'
import Home from './pages/home';
import Login from "./pages/login";
import SignUp from './pages/signup';
import { Route,Routes } from 'react-router-dom';
import './App.css'

function App() {


  return (
    
    <div className='w-screen min-h-screen bg-[#000814] flex flex-col font-inter' >

      <Routes>
         <Route path='*' element={<Home/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/signup' element={<SignUp/>}></Route>
         
      </Routes>

    </div>
    
  )
}

export default App;
