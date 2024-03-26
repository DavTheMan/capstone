import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
export const url = 'https://fakestoreapi.com';

export default function Category({addItem, token }) {
    const [prod, setProd] = useState([])
    const [allProd, setAllProd] = useState([])
    const [cat, setCat] = useState("All")
    const [cart, setCart] = useState([]);
    const [sort, setSort] = useState("None")
    const [load, setLoad] = useState(true)
    const nav = useNavigate();
    
    useEffect(() => {
        products();
    }, [])

    const products = async () => {
        try{
            const getAllStuff = await fetch(`${url}/products`)
            const gotStuff = await getAllStuff.json()
            setProd(gotStuff)
            setAllProd(gotStuff)
            setLoad(false)
        }
        catch(error){
            console.error(error)
        }
    }
    
    
    const category = async () => {

        let filterProds = cat !== "All" ? prod.filter((product) => product.category === cat) : filterProds
   
        if(sort === "High"){
            filterProds.sort((a, b) => b.price - a.price)
        } else if(sort === "Low"){
          filterProds.sort((a, b) => a.price - b.price)
        }
        else if(sort === "A"){
          filterProds.sort((a, b) => a.title.localeCompare(b.title))
        }
        else if(sort === "Z"){
          filterProds.sort((a, b) => b.title.localeCompare(a.title))
        }
        setProd(filterProds)
    }

    

    return (
      <div>
        <div>
          <h1>Products</h1>
          <select value={cat} onChange={(event) => setCat(event.target.value)}>
          <option value={"All"}>All Categories</option>
          {[...new Set(prod.map((product) => product.category))].map(
            (category) => (<option key={category} value={category}>{category}</option>)
          )}
          </select>
          <br/>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value={"None"}>Sort By</option>
          <option value={"High"}>Price: Hight to Low</option>
          <option value={"Low"}>Price: Low to High</option>
          <option value={"A"}>Name: A to Z</option>
          <option value={"Z"}>Name: Z to A</option>
          
          </select>
          <br/>
          <button onClick={category}>Submit</button>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "10%",
        }}>
          {prod.map((product) => (
            <div key={product.id} style={{
              width: "40%",
              margin: "1%",
              padding: "10%",
              color: "black",
            }}>
                <div>
              <h2 >{product.title}</h2>
              <h2>{product.category}</h2>
              <img src={product.image} alt={product.title}/>
              <h2>${product.price}</h2>
              </div>
              <br/>
              <button>
              <Link to={`/products/${product.id}`}>info</Link>
              </button>
              </div>
          ))}
        </div>
        </div>
    );
  }
  //<Link to={`/products/${product.id}`}>info</Link>