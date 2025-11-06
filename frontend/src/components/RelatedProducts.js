import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const RelatedProducts = ({ category, subcategory }) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            // console.warn("productscopy,",productsCopy);
            productsCopy = productsCopy.filter((item) => item.category === category);
            productsCopy = productsCopy.filter((item) => item.subcategory === subcategory);
            // console.log("5 filtered related products",productsCopy.slice(0,5));
            setRelatedProducts(productsCopy.slice(0, 5));
        }

    }, [products]);
    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODUCTS"}/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-2 '>
                {
                    relatedProducts.map((item,index)=>(
                        <ProductItem key={index} image={item.images[0]} id={item._id} name={item.name} price={item.price}/>
                    ))
                }
            </div>

        </div>
    )
}

export default RelatedProducts
