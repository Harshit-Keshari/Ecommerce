import React, { useState,useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  // console.log(productId);
  const {products, addToCart}=useContext(ShopContext);
  // console.log("products are:",products);
  const[productData,setProductData]=useState(false);
 const[selectedImage,setSelectedImage]=useState('');
 const[selectedSize,setSelectedSize]=useState('');
 const {currency}=useContext(ShopContext);


//  for logic of addToCart we make fn in ShopContext and fetch it in Products.js
  const fetchProductData=()=>{
    {
      products.map((item,index)=>{
        if(item._id===productId){
          setProductData(item);
          setSelectedImage(item.images[0]);
          // console.log("productData is:",item);
          
        }
        return null;
      })
    }
  }
  useEffect(()=>{
    fetchProductData();
  },[productId,products]);
  useEffect(()=>{
     console.log("productData is:",productData);
     console.log("Image URLs:", productData.images);

  },[productData]);


  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className='flex sm:flex-col  overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.images.map((itemImage,index)=>(
                <img onClick={()=>setSelectedImage(itemImage)} key={index} src={itemImage} alt='productImage' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-60%'>
            <img src={selectedImage} alt='selectedImage' className='w-full h-auto' />
          </div>
        </div>
        {/* Product details */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-3'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {/* rating of image */}
            <img src={assets.star_icon} className='w-3 5' alt='rate'/>
            <img src={assets.star_icon} className='w-3 5' alt='rate'/>
            <img src={assets.star_icon} className='w-3 5' alt='rate'/>
            <img src={assets.star_icon} className='w-3 5' alt='rate'/>
            <img src={assets.star_dull_icon} className='w-3 5' alt='rate'/>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 '>{productData.description}</p>
          
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size: </p>
            <div className='flex gap2'>
              {
                productData.sizes.map((itemSize,index)=>(
                  <button onClick={()=> setSelectedSize(itemSize)} className={`border py-2 px-4 mx-2 bg-gray-100 ${itemSize===selectedSize ? 'border-blue-600':''}`} key={index} >{itemSize}</button>
                ))
              }
            </div>
          </div>

          {/* <button onClick={()=>selectedSize!=''? addToCart(productData._id, selectedSize): alert("Please select a size before adding to cart")} className='bg-black text-white px-8 py-4 text-sm active:bg-gray-700'>ADD TO CART</button> */}
          {/* we can do this by showing alert when size is not selcted then  avoid to add to cart */}
          {/* But better way to notify user by toast message ,for that we use React Toastify */}
          <button onClick={()=>addToCart(productData._id, selectedSize)} className='bg-black text-white px-8 py-4 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Origional Product </p>
            <p>Cash on Delivery</p>
            <p>Easy return & exchange poilicy within 7 Days</p>
          </div>
        </div>
      </div>

      {/* ---------- Description  and review section--------- */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='font-bold border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='mt-2 flex flex-col gap-4  text-sm border text-gray-500 '>
          <p>Elevate your everyday style with this modern essential. Crafted from breathable, soft cotton, it offers unmatched comfort with a refined silhouette — perfect for both casual hangouts and weekend getaways</p>
          <p>Made with premium-grade fabric, this piece ensures long-lasting durability and a smooth, skin-friendly feel. Designed with a tailored fit and reinforced stitching, it's ideal for layering or wearing solo.</p>
        </div>
      </div>

      {/* -------related product section-------- */}
      
      <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
    </div> 
  ): <div className='opacity-0'></div>
}

export default Product

