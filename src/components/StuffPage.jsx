import React, { useEffect, useState } from 'react'
//import {getAllProducts} from '../API/index.js'
export default function StuffPage() {
    const [prod, setProd] = useState([])
  
    useEffect(() => {
        products();
    }, [])

    const products = async () => {
        const getAllStuff = await fetch('https://fakestoreapi.com/products/category/electronics');
        //const prod = data;
        //setProd(await getAllStuff.json())
        setProd(await getAllStuff.json())
    }

    return (
      <div>
        <p>Hello World</p>
        {prod.map((data)=>{
            return(
              <div>
                <card >
                {data.title}{data.price}{data.description}
                </card>
              </div>

            )
        })}
      </div>
    );
  }
  //<li>{data.title}{data.price}{data.description}</li>