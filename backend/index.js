require('dotenv').config();
const express = require('express');
const cors=require('cors');
const connectToDB = require('./config/mongodb');
// const connectCloudinary = require('./config/cloudinary');
require('./config/cloudinary');
const userRouter = require('./routers/userRoute');
const productRouter = require('./routers/productRoute');
const cartRouter = require('./routers/cartRoute');
const orderRouter = require('./routers/OrderRoute');

const app=express();
const port=process.env.PORT || 5000;

connectToDB();
// connectCloudinary();

// middleware
// app.use(cors());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://my-shopper-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// api endpoints
app.use('/api/user', userRouter); // userRouter is used to handle user related routes
app.use('/api/product', productRouter); //productRTouter is used to handle product related routes
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


app.get('/',(req, res) => {
    res.send('Backend running on Vercel 🚀');
});

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
});

// if (process.env.NODE_ENV !== "production") {
//   const port = process.env.PORT || 5000;
//   app.listen(port, () => console.log(`Server running locally on port ${port}`));
// }

module.exports = app;
