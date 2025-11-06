// it allows to user to register, login, and manage their cart data.

const userModel = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); //for creating and verifying JWT tokens

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });
}

//  route for user login 
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User doesnot exists' });
        }
        // compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // create a token
            const token = createToken(user._id);
            res.status(200).json({ success: true, token });
        } else {
            // user trying to login with wrong password
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

}

// route for user registration
const registerUser = async (req, res) => {
    console.log(" registerUser called", req.body);
    try {
        const { name, email, password } = req.body;
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // validate email and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols' });
        }
        // create new user if user has valid email and strong password
        // hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }


}

// route for adminLogin
const adminLogin = async (req, res) => {
    try{
        const {email,password}=req.body;
        if(email==process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email,password}, process.env.JWT_SECRET, { expiresIn: '3d' });   // we send the email and password combined string as payload to the token,and send it to admin
            console.log("Admin logged in successfully");
            res.status(200).json({ success: true, token });
            
        }else{
            // console.log("Invalid credentials for admin login");
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message:error.message});
    }
}

// now to authenticate admin by this email and password ,we can create a middleware auth.js


const myProfile = async (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
    loginUser,
    registerUser,
    adminLogin,
    myProfile
};

