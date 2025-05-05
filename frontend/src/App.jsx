// import { useState } from 'react'
import Home from './pages/home';
import Login from "./pages/login";
import SignUp from './pages/signup';
import { Route,Routes } from 'react-router-dom';

import Navbar from './components/Common/Navbar';
import './App.css'

function App() {


  return (
    
    <div className='w-screen min-h-screen bg-[#000814] flex flex-col font-inter' >

      <Navbar/>
      <Routes>
         <Route path='*' element={<Home/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/signup' element={<SignUp/>}></Route>
         <Route path='/about' ></Route>
         <Route path='/contact'></Route>
         
      </Routes>

    </div>
    
  )
}

export default App;
