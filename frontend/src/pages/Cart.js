import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, cartItems, currency, updateQuantity,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // console.log("Cart items:", cartItem);
    const cartItemsArray = [];
    for (const itemId in cartItems) {
      for (const itemSize in cartItems[itemId]) {
        if (cartItems[itemId][itemSize] > 0) {  //if item count is non zero
          cartItemsArray.push({
            _id: itemId,
            size: itemSize,
            quantity: cartItems[itemId][itemSize],
          })

        }
      }
    }
    // console.log("Cart items array:", cartItemsArray);
    setCartData(cartItemsArray);
    console.log("Cart data:", cartData);
  }, [cartItems]);
  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-4'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((cartProduct) => cartProduct._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols[4fr_3fr_0.5fr] items-center gap-4 '>
                <div className='flex items-start gap-6'>
                  <img src={productData.images[0]} className='w-16 sm:w-20' alt='cart img'></img>
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-xs sm:text-sm'>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-100'> {item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type='number' min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt='remove item'></img>
              </div>
            )
          })
        }
      </div>
      <div className=' flex justify-end my-20 '>
        <div className='bg-slate-50 w-full sm:w-[450px] p-5 rounded-lg shadow-md'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={()=> navigate('/placeorder')} className='bg-black my-4 py-2 px-7 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition ease-in-out duration-300'>PROCEED TO CHECKOUT</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart

