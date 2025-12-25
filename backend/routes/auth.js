const express=require("express");

const router=express.Router();
const {register,login}=require("../controllers/auth-controller")
const protect=require("../middleware/auth")
const User=require("../models/User")
//register
router.post("/register",register)

//login
router.post("/login",login)

//Me
router.get("/me",protect,async(req,res)=>{
    res.status(200).json(req.body);
})  




module.exports=router;