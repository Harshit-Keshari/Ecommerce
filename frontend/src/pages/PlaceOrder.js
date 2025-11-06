import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets/frontend_assets/assets'
import { backendURL, ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [methodSelected, setMethodSelected] = useState('COD');
  const { navigate, token, cartItems, backendURL, setCartItems, getCartItemsCount, delivery_fee, products, getTotalCartPrice } = useContext(ShopContext);
  // state for input field
  console.log("cart Items are:", cartItems)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    state: '',
    city: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {  // id of cart
        console.log("Processing item ID:", items);
        for (const itemSize in cartItems[items]) {
          if (cartItems[items][itemSize] > 0) {  // if count of cartItem of perticular size is not 0
            const itemInfo = structuredClone(products.find((product) => product._id === items));  // put the matched item which in in the cart into copy object
            // and if item info object not null then send it to order collection via api
            if (itemInfo) {
              itemInfo.size = itemSize;
              itemInfo.quantity = cartItems[items][itemSize];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log('final orderItems', orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartPrice() + delivery_fee
      }
      console.log('orderdata:', orderData);

      switch (methodSelected) {
        // api call for cod
        case 'COD':
          let result = await fetch(backendURL + '/api/order/place', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'token': token
            },
            body: JSON.stringify(orderData)

          })
          result = await result.json();
          console.log("result of sending order data to database by COD", result);
          if (result.success) {
            toast.success("order placed");
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(result.message);
          }
          break;

        // api call for stripe

        case 'stripe':
          let resultStripe = await fetch(backendURL + '/api/order/stripe', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'token': token
            },
            body: JSON.stringify(orderData)

          })
          resultStripe = await resultStripe.json();
          console.log("result of sending order data to database by stripe", resultStripe);
          if (resultStripe.success) {
            const session_url = resultStripe.session_url;
            window.location.replace(session_url);
            toast.success("order placed via Stripe");
          } else {
            toast.error(resultStripe.message);
          }
          break;

        // api call for googlepay
        case 'gpay':
          let resultGpay = await fetch(backendURL + '/api/order/gpay', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'token': token
            },
            body: JSON.stringify(orderData)
          });

          resultGpay = await resultGpay.json();
          console.log("GPay Stripe Result:", resultGpay);

          if (resultGpay.success) {
            window.location.replace(resultGpay.session_url); // redirect to Stripe UPI page
          } else {
            toast.error(resultGpay.message);
          }
          break;

      }


    }
    catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t-2'>

      {/* ---------left side --------------- */}
      <div style={{ fontFamily: 'sans-serif' }} className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={'INFORMATION'} />
        </div>

        <div style={{ fontFamily: 'sans-serif' }} className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='First Name' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Last Name' required />
        </div>

        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Email address' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Street/Town' required />

        <div style={{ fontFamily: 'sans-serif' }} className='flex gap-3'>
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='State' required />
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='City' required />
        </div>

        <div style={{ fontFamily: 'sans-serif' }} className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='number' placeholder='Zip Code' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Country' required />
        </div>

        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='number' placeholder='Phone' required />

      </div>

      {/* --------------------Right Side------------------------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] text-2xl'>
        {/* ------------------right-top--------------------------- */}
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        {/* ------------------right-bottom------------------------ */}
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={'METHOD'} />
          {/* payment method options */}

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethodSelected('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${methodSelected === 'stripe' ? 'bg-green-500' : ''}`}></p>   {/* for showing circle sign that which option is selcted  */}
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='Stripe Logo'></img>
            </div>

            <div onClick={() => setMethodSelected('gpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${methodSelected === 'gpay' ? 'bg-green-500' : ''}`}></p>   {/* for showing circle sign that which option is selcted  */}
              <img className='h-10 w-15 mx-4' src={assets.googlepay_icon} alt='google pay'></img>
            </div>
            <div onClick={() => setMethodSelected('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${methodSelected === 'COD' ? 'bg-green-500' : ''}`}></p>   {/* for showing circle sign that which option is selcted  */}
              <p className='text-gray-550 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
            </div>
          </div>

        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' style={{ fontFamily: 'sans-serif' }} className='bg-black text-white py-3 px-16 text-sm rounded'>PLACE  ORDER</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
