const express = require('express');
const { addToCart, updateCart, getUserCart } = require('../controllers/cartController');
const authUser = require('../middleware/cartAuth'); // <- correct

const cartRouter = express.Router();

cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/add', authUser, addToCart);
cartRouter.put('/update', authUser, updateCart);

module.exports = cartRouter;
