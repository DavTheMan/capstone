import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import Category from './components/Category';
import Product from './components/Product';



//import './App.css'


const App = () => {
  //const [count, setCount] = useState(0)
  const [username, setUsername] = useState("");

  return (
    <>
      <div id="container">
      <h1>Stff Wrld</h1>
      <div id="navbar">
      <Link to={`/`}>Home </Link>
      <Link to={`/Category`}>Store2 </Link>
      <Link to={`/Login`}>Login </Link>
      <Link to={`/Cart`}>Cart</Link>
      
      
      </div>
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Category" element={<Category/>} />
          <Route path={'/products/:productId'} element={<Product username={username}/>} />
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
//<Route path="/Cart" element={<Cart/>} />
// <Link to={`/Cart`}>Cart</Link>