const express= require("express")
const router = express.Router()

// *************Controllers ***************
const {registerController,loginController}= require("../controllers/Auth.Controller")


router.post("/register",registerController)
router.post("/login",loginController)



module.exports= router