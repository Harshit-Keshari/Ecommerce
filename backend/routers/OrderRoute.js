const express=require('express');
const {placeOrder,placeOrderStripe,placeOrderGpay,allOrders,userOrders,updateStatus,verifyStripe}=require('../controllers/orderController');
const adminAuth=require('../middleware/auth');
const authUser= require('../middleware/cartAuth');

const orderRouter=express.Router();

// Admin Features
orderRouter.post('/allOrders',adminAuth,allOrders); 
orderRouter.post('/status',adminAuth,updateStatus);

// payment features
orderRouter.post('/place',authUser,placeOrder); 
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/gpay',authUser,placeOrderGpay);

// verify payment

orderRouter.post('/verifyStripe',authUser,verifyStripe);

// user features
orderRouter.post('/userOrders',authUser,userOrders);

module.exports=orderRouter;
