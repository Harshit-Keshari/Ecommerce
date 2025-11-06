const userModel =require("../models/userModel");

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, itemSize } = req.body;

    const userData = await userModel.findById(userId); 
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {}; 

    // Add/Update logic
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][itemSize]) {
      cartData[itemId][itemSize] = 0;
    }

    cartData[itemId][itemSize] += 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Product added to cart', cartData });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// update user cart
const updateCart = async (req, res) => {
  try {
    const { itemId, userId, itemSize, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][itemSize] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Cart updated', cartData });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//  get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


module.exports= {
    addToCart, updateCart, getUserCart
};