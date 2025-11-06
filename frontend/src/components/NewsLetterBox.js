import React, { useState, useEffect,useContext } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {token,navigate}=useContext(ShopContext);

  const onSubmitHandler = (e) => {
  e.preventDefault();

  if (token) {
    toast.info('Already Subscribed');
    navigate('/');
  } else {
    navigate('/login');
  }
};


  
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-500 mt-4'>
        Don’t miss out on exclusive deals, product updates, and shopping tips!
        Subscribe now and get 20% OFF your first order
      </p>

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border px-2 py-1 rounded'
      >
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email-id'
          className='w-full outline-none px-3 py-2'
          required
        />
        <button
          type='submit'
          className='px-6 py-2 rounded text-white bg-gray-800'>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
