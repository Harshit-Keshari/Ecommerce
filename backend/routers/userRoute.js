const express = require('express');
const { loginUser, registerUser, adminLogin , myProfile} = require('../controllers/userController');
const userRouter = express.Router();
const userAuth=require('../middleware/cartAuth');
userRouter.post('/login', loginUser);  //login user high level fn inside userController
userRouter.post('/register', registerUser);
userRouter.post('/admin-login', adminLogin);

userRouter.get('/profile', myProfile);
// test route
userRouter.get('/test', (req, res) => {
    res.send('User route is working');
});

module.exports = userRouter;