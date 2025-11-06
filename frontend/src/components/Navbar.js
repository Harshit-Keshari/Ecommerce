import { Link, NavLink } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartItemsCount, setToken, setCartItems, navigate, token } = useContext(ShopContext);

  const login = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
    toast.call('User is logged out ');
  }

  return (
    <div className='flex justify-between items-center py-5 font-medium text-lg'>
      <Link to='/'><img src={assets.logo} alt="logo" /></Link>
      <ul className='hidden sm:flex gap-10 font-2 text-gray-700 '>
        <NavLink to="/" className="flex flex-col items-center gap-1 " >
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden '></hr>
        </NavLink>
        <NavLink to="/collections" className="flex flex-col items-center gap-1 " >
          <p>COLLECTIONS</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden'></hr>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 " >
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden'></hr>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 " >
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-400 hidden'></hr>
        </NavLink>
      </ul>

      <div className='flex items-center gap-5 relative'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer mx-2' />

        {/* Profile Icon with Hover Dropdown */}

        {/* when user is not logged in then on clicking profile icon dropdown should not be appear */}
        <div className='relative group'>
          <img onClick={() => {
            if (!token) {
              toast.info("Please login to access your profile");
              navigate('/login');
            }
          }} src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer min-w-4 flex-shrink-0' />
          {
            token &&
            <div className='hidden group-hover:block absolute right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-800 shadow-md rounded'>
                <p onClick={()=> navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={login} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          }

        </div>


        <Link to="/cart" className='relative'>
          <img src={assets.cart_icon} alt="cart" className='w-5  cursor-pointer min-w-5' />
          <p className='absolute top-[-6px] right-[-8px] w-4 h-4 rounded-full bg-black text-white text-[10px] text-center leading-4'>{getCartItemsCount()}</p>
        </Link>

        {/* //menu icon for mobile view */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden' />

      </div>
      {/* sidebar menu for small screen */}

      <div className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-700'>
          <div onClick={() => setVisible(false)} className='flext iotems-center gap-4 p-3 cursor-pointer hover:bg-gray-200'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='drop' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/' >HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection' >COLLECTIONS</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about' >ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact' >CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
