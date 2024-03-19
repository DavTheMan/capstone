import React from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = ({ cart, remove, up, down, clear }) => {
    const navigate = useNavigate();
    const total = cart.reduce((acc, product) => {
        const price = Number(product.price) || 0;
        const quantity = Number(product.quantity) || 0;
        return acc + price * quantity;
    }, 0);
    
    const handleReturn = () => {
        navigate('/products');
    }

    const handleCheckout = () => {
        clear();
        navigate('/checkout');
    }
    return (
        <div>
            <div>
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                cart.map((product, index) => (
                    <div key={index}>
                        <h2>{product.title}</h2>
                        <h2>{`Price: ${product.price}`}</h2>
                            <div>
                                <button onClick={()=> down(product)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={()=> up(product)}>+</button>
                            </div>
                            <button onClick={()=> remove(product)}>Remove</button>
                            </div>
                        ))
                    )}
                            <div>
                                Total: ${total.toFixed(2)}  
                            </div>
                            <button className='backToProducts_btn' onClick={handleReturn}>Return to Products
                            </button>
                            <button className='checkout_btn' onClick={handleCheckout}>Ready to Checkout?</button>
                    </div>               
            </div>
    );
};

export default Cart;