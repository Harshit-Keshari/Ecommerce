import { useEffect, useState } from 'react';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      let result = await fetch(backendURL + '/api/order/allOrders', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'token': token
        }
      });
      result = await result.json();

      if (result.success) {
        setOrders(result.orders.reverse());
        console.log("all orders fetched successfully from api");
      } else {
        toast.error("failed to fetch orders from api");
        console.log("failed to fetch orders from api");
      }
    } catch (error) {
      toast.error(error.message);
      console.log("failed to fetch orders from api");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      let result = await fetch(backendURL + '/api/order/status', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ orderId, status: event.target.value })

      })

      result = await result.json();
      if (result.success) {
        await fetchAllOrders();
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className='mt-4'>
      <h2 className='font-semibold'>Orders Page</h2>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>

              {/* 1️⃣ Parcel Image */}
              <img src={assets.parcel_icon} className='w-12' alt='orders' />

              {/* 2️⃣ Item details + Customer name + Address + Phone */}
              <div>
                {order.items.map((item, idx) => (
                  <p className='py-1' key={idx}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                ))}
                <p className='mt-3 mb-1 font-medium'>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state},</p>
                <p>{order.address.country}, {order.address.zipCode}</p>
                <p className='mt-1'>{order.address.phone}</p>
              </div>

              {/* 3️⃣ Order Info: Item count, payment method, payment status, date */}
              <div>
                <p>Items: {order.items.length}</p>
                <p className='mt-2'>Payment Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>

              {/* 4️⃣ Amount */}
              <div>
                <p className='text-sm sm:text-[15px] font-medium sm:mt-2 lg:mt-0'><strong>{currency}</strong> {order.amount}</p>
              </div>

              {/* 5️⃣ Status Selector */}

              <select onChange={(event) => statusHandler(event, order._id)} className='p-2 font-semibold border rounded hover:border-[#c586a5]'>
                <option value='Order placed'>Order placed</option>
                <option value='Packing'>Order packing</option>
                <option value='Shipped'>Package shipped</option>
                <option value='Out for delivery'>Out for delivery</option>
                <option value='Deliverd'>Package is deliverd</option>
              </select>


            </div>

          ))
        }
      </div>
    </div>

  );
};

export default Orders;
