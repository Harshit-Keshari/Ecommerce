import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
 import { ToastContainer, toast } from 'react-toastify';
// for using backend url in login we have to import backend url and export to other components
export const backendURL = process.env.REACT_APP_BACKEND_URL;
export const currency='₹';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):'');
  // after logged in when we refresh the page then automatically logout
  // to resolve this we have to store token on localstorage

  useEffect(()=>{
    localStorage.setItem('token',token);
  })
  // Check if token is not present then redirect to login page and other components will not render
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === '' ? <Login setToken={setToken}/>
          :
          <>
            <Navbar setToken={setToken}/>
            <hr />
            <div className='flex w-full'>
              <Sidebar />

              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] text-gray-600 text-base my-8'>
                <Routes>
                  <Route path='/' element={<List/>}/>
                  <Route path='/add' element={<Add/>} />
                  <Route path='/list' element={<List />} />
                  <Route path='/allOrders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </div>
  );
}

export default App;
