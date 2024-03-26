import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const url = `https://fakestoreapi.com`;

export default function Cart({ token, setToken, username, setUsername }) {
  const nav = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [successData, setSuccessData] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(`Cart-Items-${username}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zipcode: "",
    creditCard: "",
  });

  //Keep this useEffect for testing (this fetches user 2's cart)
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch(`${url}/carts/user/2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setSuccessData(result[0].products);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
    getUserInfo();
  }, [token]);

  useEffect(() => {
    async function getProductInfo() {
      successData?.forEach(async (obj, idx) => {
        const { productId: id } = obj;
        const res = await fetch(`${url}/products/${id}`);
        const productInfo = await res.json();
        localStorage.setItem(
          `Cart-Item-${idx + 1}`,
          JSON.stringify({ ...productInfo, quantity: obj.quantity })
        );
      });
    }
    getProductInfo();
  }, [successData]);

  useEffect(() => {
    async function getCart() {
      try {
        const cartItem = JSON.parse(localStorage.getItem("Cart-Items")) || [];
        if (cartItem && cartItem[0]) {
          setCart(cartItem);
        }
      } catch (error) {
        console.error("Error getting cart:", error);
      }
    }
    getCart();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  async function logOut() {
    setToken("");
    alert("You're logged out!");
    nav(`/products/`);
    setUsername("");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = (idx) => {
    const updatedCart = cart.filter((item, index) => index !== idx);
    setCart(updatedCart);
    localStorage.setItem(`Cart-Items-${username}`, JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (idx, change) => {
    const updatedCart = cart.map((item, index) => {
      if (index === idx) {
        const updatedItem = { ...item, quantity: item.quantity + change };
        localStorage.setItem(
          `Cart-Item-${idx + 1}`,
          JSON.stringify(updatedItem)
        );
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem(`Cart-Items-${username}`, JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    localStorage.removeItem(`Cart-Items-${username}`);
    setSuccessData([]);
    setCart([]);
    setFormData({
      street: "",
      city: "",
      zipcode: "",
      creditCard: "",
    });
    setShowCheckoutForm(false);
    alert("Your Products are on the way!");
  };

  if (!username) {
    return (
      <div>
        <p>You are not logged in.</p>
        <div>
          <Link to="/login">
            Login
          </Link>
          <Link to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="account">
      <h2>User Cart</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cart &&
        cart.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "20px" }}>
            <p>{item.title}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleQuantityChange(idx, -1)}>-</button>
            <button onClick={() => handleQuantityChange(idx, 1)}>+</button>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </div>
        ))}
      <button onClick={logOut}>
        Log Out
      </button>
      <button onClick={() => setShowCheckoutForm(true)}>
        Checkout Items
      </button>
      {showCheckoutForm && (
        <div>
          <h3 >Checkout Form</h3>
          <form>
            <label >
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                
              />
            </label>
            <label >
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </label>
            <label >
              Zipcode:
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                
              />
            </label>
            <label style={{ display: "block", margin: "10px" }}>
              Credit Card:
              <input
                type="text"
                name="creditCard"
                value={formData.creditCard}
                onChange={handleInputChange}
                
              />
            </label>
            <button type="button" onClick={handleCheckout}>
              Confirm Checkout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}