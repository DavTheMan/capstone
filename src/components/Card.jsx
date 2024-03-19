import React from "react";
function Card({item}){
    return(
        <div>
            <div>
                {item.map((val)=>(
                    <div key={val.id} className='cat'>
                        <h2>{val.title}</h2>
                        <div>
                        <img src={val.image} alt={val.title}/>
                        </div>
                        <div className='cardBod'>
                            <div>
                                <p>{val.description}</p>
                                <p>{val.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Card;