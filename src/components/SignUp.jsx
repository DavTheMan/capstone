import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
//import Login from "./login";
export default function SignUp() {
    const [regData, setRegData] = useState({email:'',
    username:'',
    password:'',
    name: {
        firstname:'',
        lastname:''
    },
    address: {
        city:'',
        street:'',
        number:'',
        zipcode:'',
        
    },
    phone:''
    })
    const handleInput = (e) => {
        const{ name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setRegData(prevState => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]:value
                }
            }));
        } else {
            setRegData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    async function handleSubmit(){
        preventDefault();
        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(regData),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                navigate('/products');
            } else {
                const errorData = await response.json();
                console.error('Error:', response.status, errorData);
            }
        } catch (error) {
            console.error('Error:', error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='name.firstname'
                placeholder='First Name'
                value={regData.name.firstname}
                onChange={handleInput}
            />
            <input
                type='text'
                name='name.lastname'
                placeholder='Last Name'
                value={regData.name.lastname}
                onChange={handleInput}
            />
            <input
                type='text'
                name='email'
                placeholder='Email'
                value={regData.email}
                onChange={handleInput}
            />
            <input
                type='text'
                name='username'
                placeholder='Username'
                value={regData.username}
                onChange={handleInput}
            />
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={regData.password}
                onChange={handleInput}
            />
            <h3>Phone</h3>
            <input
                type='text'
                name='phone'
                placeholder='Phone'
                value={regData.phone}
                onChange={handleInput}
            />
            <button className='register' type='submit'>Register</button>
            <button><Link to={`/Login`}>Login</Link></button>
        </form>      
    );;

  }