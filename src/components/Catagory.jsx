import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
export default function Catagory() {
    const url = "https://fakestoreapi.com/products/categories/";
    const [prod, setProd] = useState([])
  
    useEffect(() => {
        products();
    }, [])

    const products = async () => {
        const getAllProd = await fetch(url);
        setProd(await getAllProd.json())
    }
    //const filterProds = products.filter((item) => item.category)
    return (
      <div className="cat">
        <p>Hello World</p>
        <div><button><Link to={`/StuffPage`}>all</Link></button></div>
        {prod.map((data,i)=>{
            return(
                <div key = {i}>
                <button><Link to={`/${data}`}>{data}</Link></button>
                </div>
            )
            
        })}
        
      </div>
    );
  }
  /*//const [prodCat, setProdCat] = useState({loading: true, categories: []})
    const [prod, setProd] = useState([])
  
    
    const getCategories = useCallback(() =>{
      return fetch(url)
      .then(res =>{
        if(!res.ok){
          throw new Error('fail fetch');
        }
        return res,json()
      })
      .then(data => {
        setProdCat({
          loading: false, categories: data.map((el, index) =>{
            return{
              id: el.id,
              title: el.title,
              selected: false
            }
          })
        })
      })
      .catch(err => {console.log(err);})
    }, []);
  
    const getProducts = (prodId, selectedProdCat) => {

    }
*/
  