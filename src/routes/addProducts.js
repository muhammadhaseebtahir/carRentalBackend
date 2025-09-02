const express = require("express");
const verifyToken = require("../middlewares/AuthMiddleware");
const {upload} = require("../config/cloudinaryConfig");
const { addProductController,getAllProductsController,deleteProduct,updateProductController } = require("../controllers/AddProducts.Controller");

const router = express.Router();

router.post("/addproduct", verifyToken, upload.single("image"), addProductController);
router.get("/getProducts", verifyToken, getAllProductsController);

router.put("/updateProduct/:id",verifyToken, upload.single("image"),updateProductController)


router.delete("/deleteProduct/:id", verifyToken, deleteProduct);

module.exports = router;
