import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const BestSeller = () => {
  const { currency, products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller === true);
    setBestSellers(bestProducts);
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Our most-loved picks are waiting! See what everyone’s buying.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {bestSellers.map((item, index) => (
          <Link to={`/product/${item._id}`} key={index} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
              <img className='hover:scale-110 transition ease-in-out' src={item.images[0]} alt='productImg' />
            </div>
            <p className='pt-3 pb-1 text-sm'>{item.name}</p>
            <p className='text-sm font-medium'>{currency}{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
