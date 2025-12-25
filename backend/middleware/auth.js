const User=require("../models/User");
const jwt=require("jsonwebtoken");

const protect=async(req,res,next)=>{
   
    let token;
    
    if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith("bearer")){
       
        try{
            
            token=req.headers.authorization.split(" ")[1];

            const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user=await User.findById(decoded.id).select("-password");
            return next();
        }
        catch(err){
           
            console.error("Token verification failed ",err)
            return res.status(401).json({
                message:"Not authorized.Token failed"
            })
        }
    }
    return res.status(401).json({
      message: "Not authorized",
    });
   
}


module.exports=protect;