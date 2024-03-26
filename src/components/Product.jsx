import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
export const url = 'https://fakestoreapi.com';

export default function Product({ addItem, token }) {
    const [prod, setProd] = useState({})
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(null)
    const [id, setId] = useState();
    const [message, setMessage] = useState(null);
    const {prodId} = useParams()
    const nav = useNavigate()
    
    useEffect(() => {
        products();
    }, [prodId])

    /*const products = async () => {
        try{
            const getStuff = await fetch(`${url}/products/${prodId}`);
            const gotStuff = await getStuff.json();
            setProd(gotStuff)
        }
        catch(error){
            console.error(error)
        }
    }*/
    const products = async () => {
        fetch(`${url}/products/${prodId}`)
        .then((response) => {
            if(!response.ok){
                throw new Error('network error')
            }return response.json()
        })
        .then((data) => {
            setProd(data)
            setLoad(false)
        })
        .catch((error) => {
            setError(error.toString())
            setLoad(false)
        })
    }
    
    if (load){
        return <div>Loading</div>
    }
    /*const addCart = async (prodId) => {
        try{
            const cartItems = JSON.parse(localStorage.getItem(`Cart-Items-${username}`)) || [];
            const response = await fetch(`${url}/products/${prodId}`)
            //const info = await response.jason()
            const newItem = {id: prodId, ...prodId, quantity: 1}
            cartItems.push(newItem)
            localStorage.setItem("Cart-Items-${username}", JSON.stringify(cartItems))
            setMessage("Product added to Cart!")
            nav("/cart/")   
        }catch(error){
            console.error(error)
        }
    }*/
    return (
        <div>
            <h2>{prod.title}</h2>
            <h2>${prod.price}</h2>
            <img src={prod.image} alt={prod.title}/>
            <p>{prod.description}</p>
            <button onClick = {() => addCart(prodId)}>Add to your Cart!</button>
            
            
        </div>
    )/*
    return (
        <div>
            {prod.title && <h2>{prod.title}</h2>}
            {prod.price && <h2>${prod.price}</h2>}
            {prod.image && (<img src={prod.image} alt={prod.title}/>)}
            {prod.description && <p>${prod.description}</p>}
            <button onClick = {() => addCart(prodId)}>Add to your Cart!</button>
            {message && <p>{message}</p>}
        </div>
    )*/
  }