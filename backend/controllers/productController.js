// addProduct,updateProduct,deleteProduct, getSingleProductDetails

const productModel = require('../models/productModel');
const cloudinary = require('../config/cloudinary');

const addProduct = async (req, res) => {
    console.log("req.body is:", req.body); // debug

    if (!req.body) {
        return res.status(400).json({ success: false, message: "Form data missing" });
    }
    try {
        // we use multer middleware to upload files as form data,hence we can access the file using req.file
        // by multer we send multiple images in an array

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]; // this will be the first image uploaded by multer
        const image2 = req.files.image2 && req.files.image2[0]; // this will be the second image uploaded by multer
        const image3 = req.files.image3 && req.files.image3[0]; // this will be the third image uploaded by multer
        const image4 = req.files.image4 && req.files.image4[0]; // this will be the fourth image uploaded by multer

        const images = [image1, image2, image3, image4].filter((img) => img !== undefined);

        let imageUrls = await Promise.all(images.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url; // we return the secure url of the image uploaded to cloudinary
        }))
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const newProduct = new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(req.body.sizes),
            images: imageUrls
        })
        await newProduct.save();
        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log('Image urls:', imageUrls);
        console.log("Image files:", images);
        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: error.message });
    }

}
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        console.log("Product removed successfully");
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.log("problem to delete",error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}

// Function to get details of a single product so that only admin can delete the product
const singleProductDetails = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


module.exports = { addProduct, listProducts, removeProduct, singleProductDetails };


