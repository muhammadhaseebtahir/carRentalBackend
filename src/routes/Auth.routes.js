const express= require("express")
const router = express.Router()
const verifyToken = require("../middlewares/AuthMiddleware")

// *************Controllers ***************
const {registerController,loginController,forgotPasswordController,userController}= require("../controllers/Auth.Controller")


router.post("/register",registerController)
router.post("/login",loginController)
router.put("/forgot-password",forgotPasswordController)
router.get("/user",verifyToken,userController)



module.exports= router