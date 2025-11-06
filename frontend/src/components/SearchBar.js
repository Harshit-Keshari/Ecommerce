import React, { useEffect } from 'react'
import {useState,useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets';

const SearchBar = () => {
    const {search, setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);

    const location = useLocation();
    useEffect(()=>{
        console.log(location.pathname);
        if(location.pathname.includes('collections')){
            setVisible(true);
        }else{
            setVisible(false);
        }
    },[location])

    // we have to show the search bar only on collection page (not all pages)  by default .
    // For that we can use useLocation hook and give it the location name of collection page.
  return showSearch && visible? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input  value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm ' type='text' placeholder='Search'></input>
            <img className='w-4' src={assets.search_icon}></img>
        </div>
        <img onClick={()=>setShowSearch(false)}  className='inline w-3 cursor-pointer ' src={assets.cross_icon} alt="close" />
      
    </div>
  ): null;
}

export default SearchBar
