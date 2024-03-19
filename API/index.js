const API = 'https://fakestoreapi.com/products';

export default async function getAllProducts(){
    try{
        //const getAllProd = await fetch(API);
        //setProd(await getAllProd.json())
        fetch(API)
            .then(res=>res.json())
            .then(json=>console.log(json))
    }
    catch (error){
        console.log(error);
    }
}