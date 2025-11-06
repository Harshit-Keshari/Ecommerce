import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%]  min-h-screen border-r-2 '>

            <div className='flex flex-col  gap-4 pt-6 pl-[20%] text-[15px] mr-1'>
                <NavLink className='flex items-center gap-3 border-gray-300 border-r-0 px-4 py-2 rounded-1' to='/add'>
                    <img className='w-5 h-5 ' src={assets.add_icon} alt="Add" />
                    <p className='hidden md:block'>Add Item</p>
                </NavLink>
                <NavLink className='flex items-center gap-3 border-gray-300 border-r-0 px-4 py-2 rounded-1' to='/list'>
                    <img className='w-5 h-5 ' src={assets.order_icon} alt="List" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>
                <NavLink className='flex items-center gap-3 border-gray-300 border-r-0 px-4 py-2 rounded-1' to='/allOrders'>
                    <img className='w-5 h-5 ' src={assets.order_icon} alt="Orders" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>

        </div>
    )
}

export default Sidebar
