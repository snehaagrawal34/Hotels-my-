const jwt=require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
    //Extract token from header
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized access, token missing"});
    }
    try{
        //Verify token
       const decoded= jwt.verify(token,process.env.JWT_SECRET);
       //Attach user info to request object
       req.user=decoded;
       next(); //Proceed to the next middleware or route handler
    }catch(err){
        console.error("JWT verification failed:", err);
        return res.status(401).json({error:"Unauthorized access, invalid token"});
    }   
}
//Function to generate JWT token
const generateToken=(userData)=>{
    //generate token with user data and secret key
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:5000});
};
module.exports={jwtAuthMiddleware,generateToken};