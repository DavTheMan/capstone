import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import StuffPage from './components/StuffPage'
import Login from './components/Login';
import SignUp from './components/SignUp';
//import Catagory from './components/Catagory';
import Tech from './components/Tech';
import Bling from './components/Bling';
import Catagory from './components/Catagory';
import Cart from './components/Cart';


//import './App.css'


const App = () => {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div id="container">
      <h1>Hello React Router!</h1>
      <div id="navbar">
      <Link to={`/`}>Home</Link>
      <Link to={`/StuffPage`}>StuffPage</Link>
      <Link to={`/Catagory`}>Store</Link>
      <Link to={`/Tech`}>Tech</Link>
      
      <Link to={`/Login`}>Login</Link>
      <Link to={`/Cart`}>Cart</Link>
      
      
      </div>
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/StuffPage" element={<StuffPage/>} />
          <Route path="/Catagory" element={<Catagory/>} />
          <Route path="/Tech" element={<Tech/>} />
          <Route path="/Bling" element={<Bling/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/Cart" element={<Cart/>} />
          
        </Routes>
        </div>
      </div>
    </>
  )
}

export default App