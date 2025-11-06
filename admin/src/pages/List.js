import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const productList = async () => {
    try {
      let result = await fetch(backendURL + '/api/product/list');
      result = await result.json();
      console.log(result.products);
      if (result.success) {
        setList(result.products);
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
    const token = localStorage.getItem("token");
    console.log("token", token)
    try {
      const result = await fetch(`${backendURL}/api/product/remove/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      const response = await result.json();
      console.log(response);

      if (response.success) {
        toast.success("Product deleted");
        await productList(); 
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    productList();
  }, []);

  return (
    <>
      <p className='mt-2 mb-2'>All Products List</p>
      {/* --------------------LIST TABLE TITLE------------------------- */}

      <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 '>
        <b>Images</b>
        <b>Name</b>
        <b>Category</b>
        <b>SubCategory</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/* ----------------------------------products list---------------------------------- */}

      <div>
        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm'>
              <img className='w-12' src={item.images[0]} alt='image' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.subCategory}</p>
              <p>{item.price}</p>
              <b onClick={() => removeProduct(item._id)} className='flex justify-center text-center cursor-pointer'>X</b>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default List
