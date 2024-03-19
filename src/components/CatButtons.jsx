import React from "react";
function CatButtons({itemCat}){
    return(
        <div className='buttonz'>
            {
                itemCat.map(val => (
                    <button>{val}</button>
                ))
            }
            <button>All</button>
        </div>
    )
}
export default CatButtons;