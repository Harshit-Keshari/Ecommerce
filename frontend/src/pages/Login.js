import React, { useContext, useEffect, useState } from 'react'
import { backendURL, ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
const Login = () => {
  const [currentState, setCurrentState] = useState('SignUp'); // login or signup
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'SignUp') {  // call the signup api
        let result = await fetch(backendURL + '/api/user/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        })
        result = await result.json();
        console.log("result of register", result);
        if (result.success) {
          localStorage.setItem("token", result.token);
          setToken(result.token); 
          toast.success('Successfully Registered');
          navigate('/')
        } else {
          setName('');
          setEmail('');
          setPassword('');
          toast.error(result.message || "Registration failed");
          // navigate('/login')  //navigation with help of token
        }
      } else {  //call login api

        let result = await fetch(backendURL + '/api/user/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        result = await result.json();
        console.log("result of login", result);

        if (result.success) {
          localStorage.setItem("token",token);
          setToken(result.token); // save token in context
          
          toast.success("Logged in successfully");
          // navigate('/');  //navigation with help of token
        } else {
          toast.error("Invalid credentials");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);

    }

  };

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  })

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
      </div>
      {currentState === 'SignUp' ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-full px-3 py-2 border border-gray-800' required /> : ''}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full px-3 py-2 border border-gray-800 rounded-sm' required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='w-full px-3 py-2 border border-gray-800 rounded-sm' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your password ?</p>
        {
          currentState === 'Login' ?
            <p className='cursor-pointer' onClick={() => setCurrentState('SignUp')}>Create New Account</p> :
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white px-40 py-2 rounded-lg'>{currentState === 'Login' ? 'Login' : 'SignUp'}</button>
    </form>
  )
}

export default Login
