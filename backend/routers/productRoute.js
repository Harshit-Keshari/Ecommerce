const express=require('express');
const { addProduct, listProducts, removeProduct, singleProductDetails } = require('../controllers/productController');
const productRouter=express.Router();
const upload=require('../middleware/multer'); 
const adminAuth = require('../middleware/auth');

productRouter.post('/add',adminAuth,upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);  // use multer middleware to handle file uploads with addProduct route

productRouter.get('/list', listProducts);
productRouter.delete('/remove/:id',adminAuth, removeProduct);
productRouter.get('/single/:id', singleProductDetails);

productRouter.get('/test',(req,res)=>{
    res.json({message:"ProductRouter is working fine"});
})

module.exports=productRouter;