import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' alt='About Us' src={assets.about_img}></img>
        <div className='flex flex-col justify-centwr gap-6 md:w-2/4 text-gray-600'>
          <p>My Shopper Site is your trusted online shopping destination, offering a wide range of high-quality products across fashion, electronics, home essentials, and more. We aim to deliver a smooth, secure, and enjoyable shopping experience for every customer.</p>
          <p>At My Shopper Site, we believe in quality, affordability, and customer satisfaction. Our team works tirelessly to curate the best products and provide you with the latest trends and innovations. Join us on this shopping journey and discover why we are the preferred choice for online shoppers.</p>
          <b className='text-gray-800'>Our Mission: </b>
          <p>Our mission is to provide a diverse selection of products at competitive prices, ensuring that you find exactly what you need. We are committed to exceptional customer service, fast shipping, and hassle-free returns, making your shopping experience as convenient as possible.</p>  
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance: </b>
          <p className='text-gray-500'>We take pride in offering only the highest quality products, thoroughly vetted for durability and performance. Our commitment to quality means you can shop with confidence, knowing that every item meets our rigorous standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-500'>We understand that your time is valuable. That's why we've designed our website to be user-friendly and efficient, making it easy to find and purchase the products you need. With fast loading times and a seamless checkout process, shopping with us is a breeze.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-500'>We believe in putting our customers first. Our dedicated support team is always ready to assist you with any inquiries or issues you may have. From pre-purchase questions to post-purchase support, we're here to ensure your shopping experience is smooth and enjoyable.</p>
        </div>
      </div>
      <NewsLetterBox/>
      


    </div>
  )
}

export default About
