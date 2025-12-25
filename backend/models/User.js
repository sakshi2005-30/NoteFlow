const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timeStamps:true});

//hash password
userSchema.pre("save",async function(){
    //if password is not changed or modified means if its as it is then don't hash
    //here this means the current user
    if(!this.isModified("password")){
        return ;
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    ;
})


//check if entered password is same as the password stored in the db which is hashed

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
module.exports=mongoose.model("User",userSchema);