import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(sizes, bestseller);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); // corrected spelling
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes)); // array to string

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    const token = localStorage.getItem('token');
    console.log(token);

    // post formData to backend via fetch 
    try {
      let result = await fetch(backendURL + "/api/product/add", {
        method: 'POST',
        headers: {
          token: token
        },
        body: formData
      });
      result = await result.json();
      if(result.success){
        toast.success(result.message);
        console.log("Raw response:", result);
        // after adding product we have set all field empty for next product addition
        setName('');
        setCategory('');
        setDescription('');
        setSubCategory('');
        setBestseller(false);
        setPrice('');
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false); 
      }else{
        toast.error(result.message);
      }
      
    } catch (error) {
      console.log("failed to fetch form data", error.message);
      toast.error("Failed to add new product");
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 w-full items-start'>
      <div>
        <p>Upload Image(s)</p>
        <div className='mt-2 flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt='images' />
            <input onChange={(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden />
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='images' />
            <input onChange={(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden />
          </label>
          <label htmlFor='image3'>
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='images' />
            <input onChange={(e) => setImage3(e.target.files[0])} type='file' id='image3' hidden />
          </label>
          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='images' />
            <input onChange={(e) => setImage4(e.target.files[0])} type='file' id='image4' hidden />
          </label>
        </div>

        <div className='mt-4 '>
          <p className='mb-2'>Product Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' />
        </div>

        <div className='mt-4 '>
          <p className='mb-2'>Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Write context here' />
        </div>

        <div className='flex flex-col mt-2 sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>SubCategory</p>
            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option></select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input value={price}
              onChange={(e) => setPrice(e.target.value)} className='w-full max-w-[120px] px-3 py-2' type='number' placeholder='580' />
          </div>

        </div>

        <div className='mt-2'>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            <div onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((size) => size !== 'S') : [...prev, 'S'])}>
              <p className={`${sizes.includes('S') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((size) => size !== 'M') : [...prev, 'M'])}>
              <p className={`${sizes.includes('M') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter((size) => size !== 'L') : [...prev, 'L'])}>
              <p className={`${sizes.includes('L') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((size) => size !== 'XL') : [...prev, 'XL'])}>
              <p className={`${sizes.includes('XL') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((size) => size !== 'XXL') : [...prev, 'XXL'])}>
              <p className={`${sizes.includes('XXL') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <input onChange={() => setBestseller(!bestseller)} checked={bestseller} type='checkbox' className='mr-2' id='bestseller'></input>
          <label htmlFor='bestseller' className='cursor-pointer'>Add to bestseller</label>
        </div>
        <button className='bg-black text-white mt-2 px-10 py-2 border rounded-sm'>ADD</button>

      </div>
    </form>
  )
}

export default Add
