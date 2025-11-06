// when user not authenticated, redirect to login page otherwise other ui showing
import React, { useState } from 'react'
import { backendURL } from '../App';
import {toast} from 'react-toastify';
const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            // console.log(email,password,backentURL);
            let result = await fetch(backendURL + '/api/user/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            result= await result.json();
            console.log(result);
            if(result.success){
               setToken(result.token);
            //    console.log(result.token)
               
            }else{
                toast.error(result.message || "Login failed");
            }

        } catch (error) {
           console.log(error);
           toast.error(error.message || "An error occurred");
        }

    }
    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md mt-2'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address:</p>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounde-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='admin@gmail.com' required></input>
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password:</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounde-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' placeholder='Enter your password' required></input>
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black ' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
