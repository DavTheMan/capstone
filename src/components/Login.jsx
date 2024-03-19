import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";

export default function Login({token, setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    async function handleLogin(event){
        event.preventDefault();
        try{
            const response = await fetch('https://fakestoreapi.com/auth/login',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: "DavyBoy", 
                password: "Hello135"
            }),
            });
            //const result = await response.json();
            if(response.ok){
                const result = await response.json();
                return result;
            }
            else if(response.status === 401){
                setError("wrong Username or Password");
                return null;
            }
            else{
                setError("something is wrong");
                return null;
            }
        }catch(error){
            setError(error.messge);
        }
    }
    async function getUser(token){
        return{
            name: "john doe",
            orders: [{ id: 1, orderName: 'Sample Order'},]
        }
    }
    async function handleSubmit() {
        preventDefault();
        const data = await handleLogin(username,password);
        if(data && data.token){
            const {token: fetchedToken} = data;
            setToken(fetchedToken);
            setIsLogin(true);

        }
    }
    return (
        <>
        <h2>Log In</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input type='usernsme' value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <span style={{color: "red"}}>{passwordError}</span>}
            </label>
            <button>Submit</button>
            <button>
            <Link to={`/SignUp`}>Sign Up</Link>
            </button>
        </form>
        </>
    );
    
  }