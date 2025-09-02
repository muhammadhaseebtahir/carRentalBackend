const CarProduct = require("../models/AddProduct.Model");
const {cloudinary} = require("../config/cloudinaryConfig")



const randomId = () =>
  Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

const addProductController = async (req, res) => {
  try {
    // 👇 product ko parse karo
    const productData = JSON.parse(req.body.product);

    let {
      brand,
      model,
      year,
      pricePerDay,
      category,
      transmission,
      fuel_type,
      seating_capacity,
      location,
      description,
    } = productData;

    // Required field validation
    if (
      !brand ||
      !model ||
      !year ||
      !pricePerDay ||
      !category ||
      !transmission ||
      !fuel_type ||
      !seating_capacity ||
      !location ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Image validation
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

console.log("Req is file ", req.file)
    // const imagePath = req.file.path || req.file.url;
     const imageData = {
      url: req.file.path,       // 👈 ye Cloudinary ka secure_url hota hai
      public_id: req.file.filename, // 👈 ye Cloudinary ka public_id hota hai
    };
// const imagePath= req.file.path;

    const newProduct = new CarProduct({
      product_Id: randomId(),
      brand,
      model,
      year,
      pricePerDay,
      category,
      transmission,
      fuel_type,
      seating_capacity,
      location,
      description,
      image: imageData,
      status:"available"
    });

    await newProduct.save();

    res
      .status(201)
      .json({ status: "Success", message: "Product added successfully" });
  } catch (error) {
    console.log("error",error);
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
      
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const data = await CarProduct.find();

    if (data.length === 0 || !data) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ status: "Success", data });
  } catch (err) {
    
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};



const updateProductController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await CarProduct.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    const updatedProduct = await CarProduct.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ status: "Success", data: updatedProduct });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};




const deleteProduct = async (req, res) => {
  const { id } = req.params;
// console.log("_id",id)
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await CarProduct.findById(id);
console.log("PRoduct ",product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
     if(product.image && product.image.public_id){
      await cloudinary.uploader.destroy(product.image.public_id);
     }

await CarProduct.findByIdAndDelete(id);

    res.status(200).json({ status: "Success", message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};








module.exports = { addProductController,getAllProductsController,deleteProduct };
