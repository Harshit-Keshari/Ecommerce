import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center pt-10 text-2xl border-t'>
        <Title text1={'CONTACT'} text2={'INFORMATION'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img}></img>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store: </p>
          <p className='text-gray-500'>276135 Kandhrapur <br/>NH28,Uttar Pradesh ,India</p>
          <p className='text-gray-500'>Tel: (455)555-0132 <br/> Email: admin@myshoppersite.com</p>
           <p className=' font-semibold text-gray-600'>Career at MyShopperSite<br/>NH28,Uttar Pradesh ,India</p>
          <p className='text-gray-500'>learn more about our team and job openings.</p>
          <button className='border rounded-lg border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
        </div>
        <NewsLetterBox/>
      
    </div>
  )
}

export default Contact
