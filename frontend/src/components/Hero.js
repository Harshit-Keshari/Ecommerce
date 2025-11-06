import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 h-[500px]'>
            {/* Hero left side */}
            <div className='w-full sm:w-1/2 h-full flex items-center justify-center'>
                <div className='text-[#414141] px-6'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-tight'>Latest Arrivals</h1>
                    <div className='flex items-center gap-3 mt-2'>
                        <p className='text-sans-serif font-gray-300 text-medium text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>

            {/* Hero right side */}
            <div className='w-full sm:w-1/2 h-full'>
                <img className='w-full h-full object-cover' src={assets.hero_img} alt='hero'/>
            </div>
        </div>
    )
}

export default Hero;
