
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const AuthUser= require("../models/Auth.model")
const verifyToken = require("../middlewares/AuthMiddleware")

const randomId= ()=>Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)


const registerController=async(req,res)=>{
const {userName,email,password} =req.body

if(!userName || !email || !password){
    return res.status(400).json({message:"Please fill all the input fields."})
}
try{
const existingUser=  await AuthUser.findOne({email})

if(existingUser){
    return res.status(400).json({message:"User Already exist."})
}

const hashPassword=await bcrypt.hash(password,10)

const newUser= new AuthUser( {
    userName,email,
    password:hashPassword,
    user_Id:randomId(),
    role:["customer"],
    status:"active"
})

await  newUser.save()

const token = jwt.sign({user_Id:newUser.user_Id},process.env.SECRET_KEY,{expiresIn:"10h"})

res.status(201).json({status:"SuccessFull", message:"user created succesfully,", token:token})


}catch(err){
    console.log(err)
    res.status(500).json({status:"Error",mesage:err.message})
}


}




const loginController=async(req,res)=>{
    const {email,password} =req.body
if(!email || !password){
   return  res.status(400).json({message:"Please fill all the inputs."})
    }
    try{
     const existingUser=await  AuthUser({email})
     if(!existingUser){
        return res.status(404).json({mesage:"Invalid email or password."})
     }

  const comparePassword = bcrypt.compare(password,existingUser.password)
  if(!comparePassword){
    return res.status(404).json({message:"Invalid email or password."})
  } 



     const token = jwt.sign({user_Id:existingUser.user_Id},process.env.SECRET_KEY,{expiresIn:"10h"})

 res.status(201).json({message:"SuccessFully login.",token:token})

    }catch(err){
        console.log(err)
        res.status(500).json({status:"Error",message:err.message})
    }


}

const forgotPasswordController=async(req,res)=>{
    const {email,newPassword}= req.body

  if(!email || !newPassword){
    return res.status(400).json({message:"Please fill all the inputs."})
  }
  try{
    const existingUser= await AuthUser.findOne({email})
    if(!existingUser){
        return res.status(404).json({message:"User does not exist."})
    }
   const hashPassword= await bcrypt.hash(newPassword,10)

   existingUser.password= hashPassword
   await existingUser.save()

   res.status(200).json({message:"Password updated successfully."})
  }catch(err){
    console.log(err)
    res.status(500).json({ status:"Error", message:err.message})
  }


}

const userController=(req,res)=>{
    const user_Id= req.user_Id



    
}






module.exports={registerController,loginController}