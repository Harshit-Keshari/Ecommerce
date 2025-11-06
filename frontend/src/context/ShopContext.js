import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// createContext is a React API that allows you to create a context object, which lets you share data globally across your component tree without passing props manually at every level.
// import { products } from "../assets/assets/frontend_assets/assets";
// now we fetch products from api
export const ShopContext = createContext();
export const backendURL = process.env.REACT_APP_BACKEND_URL||5000 ;


export const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 150;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // set a state for product data from database
  const [products, setProducts] = useState([]);

  // for login user we need tp store token coming from backend
  const [token, setToken] = useState('');

  // when click on proceed to checkout on cart.js
  // then navigate to page PlaceOrder.js

  const navigate = useNavigate();

  const addToCart = async (itemId, itemSize) => {

    if (!itemSize) {
      toast.error("Please select size first");
      return;
    }
    if (!token) {
      toast.error("Please login first to add items to cart");
      navigate('/login');
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][itemSize]) {
        cartData[itemId][itemSize] += 1;
      } else {
        cartData[itemId][itemSize] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][itemSize] = 1;
    }

    setCartItems(cartData);

    // if token is available then we add cartItem to database
    // for this we need userId(automatically gen),itemId,size

    try {
      let result = await fetch(backendURL + '/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ itemId, itemSize })
      })

      result = await result.json();
      console.log("result of fetching add to cart", result);

    } catch (error) {
      console.log(error.message);
      toast.error(error.error);
    }

  }
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems])


  const getCartItemsCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {  // count
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalCount += cartItems[items][size];
        }
      }

    }
    return totalCount;
  }

  // updating  cart item count

  const updateQuantity = async (itemId, itemSize, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][itemSize] = quantity;
    setCartItems(cartData);

    // make logic when we update product quantity on cart page then it can be updated on database also
    if(token){
      try{
        let result= await fetch(backendURL+'/api/cart/update',{
          method:"PUT",
          headers:{
            'Content-Type':'application/json',
            'token':token
          },
          body: JSON.stringify({itemId,itemSize,quantity})
        })
        result=await result.json();
        console.log("result from update qunatity ",result);

      }catch(error){
        console.log(error.message);
        toast.error(error.message);

      }
    }
  }
//  now problem is that when we refresh how much cart items ,this is erased from cart show we fetch userCart

const getUserCart=async(token)=>{
  try{
    let result=await fetch(backendURL+'/api/cart/get',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'token':token
      }
    });
    result=await result.json();
    console.log("result of getUserCart",result);
    if(result.success){
      setCartItems(result.cartData);
    }

  }catch(error){
    console.log(error.message);
    toast.error(error.message);
  }
}

useEffect(()=>{
  if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
    getUserCart(localStorage.getItem('token'));
  }
})

  // counting total price of cart items
  const getTotalCartPrice = () => {
    let totalPrice = 0;
    for (const itemsId in cartItems) {
      for (const itemSize in cartItems[itemsId]) {
        if (cartItems[itemsId][itemSize] > 0) {  // if no. of selected items is not null
          const productData = products.find((item) => item._id === itemsId);
          if (productData) {
            totalPrice += productData.price * cartItems[itemsId][itemSize];  // count*price =tatal amount
          }
        }
      }
    }
    return totalPrice;
  }

  // fetching products dynamically from database
  const getProductsData = async () => {
    try {
      let result = await fetch(backendURL + '/api/product/list');
      result = await result.json();
      // result=await result.text();
      console.log("result", result);
      if (result) {
        setProducts(result.products);
      } else {
        toast.error("Failed to fetch products data from database");
      }


    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductsData();
    // console.log(products);
  }, [])

  //  to prevent log out when refresh the application

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, [])

  

  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
    addToCart, getCartItemsCount, cartItems, setCartItems, updateQuantity, getTotalCartPrice
    , navigate, getProductsData, token, setToken, backendURL
  };
  return ( 

    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )

};
export default ShopContextProvider;