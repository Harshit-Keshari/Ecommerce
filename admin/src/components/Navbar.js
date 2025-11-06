import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} alt="Logo" className="h-12  w-[max(10%,150px)]" />
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-3 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LogOut</button>
    </div>
  );
};

export default Navbar;
