import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
const Orders = () => {
  const { backendURL, token, products, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      let result = await fetch(backendURL + '/api/order/userOrders', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },

      })
      result = await result.json();
      console.log("result of load user Order", result);
      if (result.success) {
        let allOrdersItem =[];
        result.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status;
            item['payment']=order.payment;
            item['paymentMethod']=order.paymentMethod;
            item['date']=order.date;

            allOrdersItem.push(item)

          })

        })

        setOrderData(allOrdersItem.reverse());  // so that latest order appear first

      } else {
        toast.error('Failed to load orders');
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t  pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row justify-between  items-start sm:items-center  gap-4'>
              <div className='flex flex-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.images[0]}></img>
                <div >
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-500'>
                    <p>{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p className='gap-1'>Sizes:{item.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between gap-2 '>
                <div className='flex  items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500   '></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
