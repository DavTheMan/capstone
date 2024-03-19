import React, { useEffect, useState } from 'react'
import Catagory from './Catagory';
export default function Tech() {
    const url = "https://fakestoreapi.com/products/category/women's clothing";
    const [prod, setProd] = useState([])
  
    useEffect(() => {
        products();
    }, [])

    const products = async () => {
        const getAllProd = await fetch(url);
        setProd(await getAllProd.json())
    }
    /*const products = async () => {
        const getAllProd = await fetch(url, {method:"POST",
    body:JSON.stringify({
        title:{data},
        price:{data},
        description:{data},
        image:{data},
        catagory:{data}
    })});*/
    return (
        <div className="stuff">
          <p>Hello World</p>
          {prod.map((data)=>{
              return(
                <div>
                  <card className="card">
                  {data.title}{data.price}{data.description}
                  </card>
                </div>
  
              )
          })}
        </div>
      );
  }