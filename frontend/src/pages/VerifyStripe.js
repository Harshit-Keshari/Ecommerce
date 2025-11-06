import React,{useContext,useEffect,useState} from 'react';
import { backendURL, ShopContext} from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyStripe = () => {
    const {navigate, token, setCartItems}=useContext(ShopContext);
    const [searchParams,setSearchParams]=useSearchParams();  // from parameter ,uses to extrat success and order id

    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');

    const verifyStripePayment=async()=>{
        try{
            if(!token){
                return null;
            }

            let result=await fetch(backendURL+ '/api/order/verifyStripe',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'token':token
                },
                body:JSON.stringify({success,orderId})

            })
            result=await result.json();

            if(result.success){
                setCartItems({});
                navigate('/orders')
            }else{
                navigate('/cart');
            }

        }catch(error){
            console.log(error.message);
            toast.error(error.message);

        }
    }

    useEffect(()=>{
        verifyStripePayment();
    },[token]);
  return (
    <div>
      
    </div>
  )
}

export default VerifyStripe
