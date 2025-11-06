import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollections = () => {
    const { products } = useContext(ShopContext);
    console.log("product collections:", products);
    const [latestProducts, setLatestProducts] = useState([]);
    useEffect(() => {
        setLatestProducts(products.slice(0, 15)); // Get the first 10 products
    }, [products]);
    console.log("latestProducts: ", latestProducts);
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>New arrivals, fresh styles.
                    Check out what’s trending now! – curated just for you. Shop now before it’s gone!</p>
            </div>

            {/* rendering products from products array */}
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
                {
                    latestProducts.map((item, index) => {
                        console.log("ITEM CHECK:", item); // 🔍 Check entire object
                        return (
                            <ProductItem
                                key={index}
                                id={item._id} // we'll verify this field
                                image={item.images[0]}
                                name={item.name}
                                price={item.price}
                            />
                        );
                    })
                }
            </div>

        </div>
    )
}

export default LatestCollections
