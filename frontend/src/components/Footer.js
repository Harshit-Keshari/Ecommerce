import { assets } from '../assets/assets/frontend_assets/assets';
import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { ShopContext} from '../context/ShopContext';

const Footer = () => {
    const {navigate}=useContext(ShopContext);
    return (
        <div>
            <div className='flex  flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-8 mt-40 text-gray-700'>
                <div>
                    <img onClick={()=>navigate('/')} src={assets.logo} className='mb-7 w-35 h-16' alt='footer' />
                    <p className='w-full md:w-2/3 text-gray-600'>Discover New styles added regularly.Fresh styles just landed Don’t miss out on exclusive deals, product updates, and shopping tips! Subscribe now and get 20% OFF your first order – straight to your inbox. 👉 Be the first to know. Be the first to save.
                    </p>
                </div>
                <div className='mt-4'>
                    <p className='text-xl  font-medium mb-6'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <Link to='/'><li className='hover:text-gray-600 cursor-pointer'>Home</li></Link>
                        <Link to='/about'><li className='hover:text-gray-600 cursor-pointer'>About Us</li></Link>
                        <Link to='/orders'><li className='hover:text-gray-600 cursor-pointer'>Delivery</li></Link>
                        <Link to='/contact'><li className='hover:text-gray-600 cursor-pointer'>Contact Us</li></Link>
                        <Link to='/privacy'><li className='hover:text-gray-600 cursor-pointer'>Privacy & Policy</li></Link>
                    </ul>
                </div>

                <div className='mt-4'>
                    <p className='text-xl  font-medium mb-6'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <li className='hover:text-gray-600 '>+1-212-456-7890</li>
                        <li className='hover:text-gray-600 '>contact@myshoopersite.com</li>
                        
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ myshoppersite.com - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;
