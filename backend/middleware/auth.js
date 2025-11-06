const jwt=require('jsonwebtoken');
const adminAuth=async(req,res,next)=>{
    try{
        const {token}=req.headers;
        if(!token){
            return res.status(401).json({success:false,message:"Not Authorized, login Again"});
        }
        const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(token_decoded.email!==process.env.ADMIN_EMAIL && token_decoded.password!==process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false,message:"Not Authorized, login Again"});
        }
        req.user=token_decoded;
        next();
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message:error.message});
    }
}
module.exports=adminAuth;