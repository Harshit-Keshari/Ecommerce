const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const currency = 'inr';
const deliveryCharge = 150;

const Stripe = require('stripe');

// intializing stripe payment gateway via giving secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placinng order by CashOndelivery(COD)
const placeOrder = async (req, res) => {
    try {
        console.log("Received body:", req.body);
        console.log("Received address:", req.body.address);

        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        console.log("orderdata", orderData);


        const newOrder = await orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} }); // after saving to database ,set cartItem empty
        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}



// placing order by stripe
const placeOrderStripe = async (req, res) => {
    try {
        console.log("Received body:", req.body);
        console.log("Received address:", req.body.address);

        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "stripe",
            payment: false,
            date: Date.now()
        }
        console.log("orderdata", orderData);


        const newOrder = await orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            // if payment is done then redirected to successURL ,otherwise cancelURL 
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });

        // await userModel.findByIdAndUpdate(userId, { cartData: {} }); // after saving to database ,set cartItem empty
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });  // once  payment done then clear the cart items
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId); //otherwise delete the order
            res.json({ success: false });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

// // placing order by google pay accessed via stripe
const placeOrderGpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "gpay",
      payment: false,
      date: Date.now()
    };

    const newOrder = await orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // THIS enables UPI/GPay
      line_items,
      mode: 'payment',
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// user orders for frontend page orders : fetching actual order from database collection order
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });  //orders array 
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}

// all orders data for Admin Panel (all userOrders )
const allOrders = async (req, res) => {
    try {
        const result = await orderModel.find({});
        if (result) {
            res.json({ success: true, 'orders': result });
        } else {
            res.json({ success: false, message: 'failed to find any order from database' });
            console.log("failed to find any order from database");
        }


    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log("error to fetch all orders from database");
    }

}
//orderStatus update
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });

    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log("error to update order status");

    }

}

module.exports = { placeOrder, placeOrderStripe, placeOrderGpay, allOrders, userOrders, updateStatus, verifyStripe }