const User=require("../models/User")
const jwt=require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};
const register=async(req,res)=>{
    try{
        const { username, email, password } = req.body;

        //check if any field is missing

        if (!username || !email || !password) {
          res.status(400).json({
            success: false,
            message: "Please fill all the details",
          });
        }
        //check if user already exits

        const userExits = await User.findOne({ username });
        if (userExits) {
          res.status(400).json({
            success: false,
            message: "User already exits",
          });
        }
        //create a new user
        const user = await User.create({
          username,
          email,
          password,
        });
        const token=generateToken(user._id);

        res.status(201).json({
          success: true,
          message: "User created sucessfully",
          data: user,
          token
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server error"
        })
    }
    
}

//login

const login=async(req,res)=>{
  console.log("REQ HIT:",req.body);
    const {username,password}=req.body;
    try{
      //if user doesn't exist or mismatch password
      const userExists = await User.findOne({ username });
      if (!userExists || !(await userExists.matchPassword(password))) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      const token=generateToken(userExists._id);
      res.json({
        data:userExists,
        token
      })
    }
    catch(err){
        console.log(err);
       res.status(400).json({
        message:"Server issue"
       })

    }
}

module.exports={register,login}