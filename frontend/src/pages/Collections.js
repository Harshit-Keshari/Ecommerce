// filter options for collections page
// This file contains the filter options for the collections page, allowing users to filter products by category 
import { useEffect, useState,useContext, use } from 'react';
import { assets } from '../assets/assets/frontend_assets/assets';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
const Collections = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState('relevent');

  // for making filter by search bar we have to use search state from ShopContext

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory((prev)=> prev.filter((item)=> item!==e.target.value))
    }else{
      setCategory((prev)=>[...prev,e.target.value]);
    }
  }
  
  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev)=> prev.filter((item)=> item!==e.target.value))
    }else{
      setSubCategory((prev)=>[...prev,e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy=products.slice();

    if(showSearch && search){
      productsCopy=productsCopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length>0){
      productsCopy=productsCopy.filter((item)=> category.includes(item.category));
    }
    
    if(subCategory.length>0){
      productsCopy=productsCopy.filter((item)=> subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  }
  
  const sortFilter = () => {
  let fbCopy = filterProducts.slice();
  switch (sortBy) {
    case 'LowToHigh':
      setFilterProducts(fbCopy.sort((a, b) => a.price - b.price));
      break;
    case 'HighToLow':
      setFilterProducts(fbCopy.sort((a, b) => b.price - a.price));
      break;
    default:
      applyFilter();
      break;
  }
};


  useEffect(()=>{
    applyFilter();
  },[category, subCategory,search,showSearch]);

  useEffect(()=>{
    sortFilter();
  },[sortBy])

  // useEffect(() => {
  //    console.warn("category",category);
  // },[category])

  // useEffect(() => {
  //    console.warn("Subcategory",subCategory);
  // },[subCategory])

  // console.log("products of collection",filterProducts);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-12 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm-hidden px-2 ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-4 ' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-4 ' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-4 ' value={'Kids'} onChange={toggleCategory}/>Kid
            </p>
          </div>

        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-4 ' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-4 ' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-4 ' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>

        </div>
      </div>

      {/* Right side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* product sort */}
          <select onChange={(e)=>setSortBy(e.target.value)} className='border-2 border-gray-200 text-sm text-gray-700 px-2 sm:px-2 py-2 rounded-md focus:outline-none focus:border-gray-700'>
            <option value='relevent'>Sort By: Relevent Price</option>
            <option value='LowToHigh'>Price: Low to High</option>
            <option value='HighToLow'>Price: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.images[0]}
                name={item.name}
                price={item.price}
              />
            ))
          }
        </div>

      </div>
    </div>

  )
}

export default Collections;

