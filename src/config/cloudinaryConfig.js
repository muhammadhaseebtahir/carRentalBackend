const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

require("dotenv").config();


cloudinary.config({
  cloud_name: "doizr9lup",
  api_key: "471676845146623",
  api_secret: "j8sNX2c2h79G60GhHu_cbHA3Uow",
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    
  },
});

const upload = multer({ storage: storage });

module.exports = {upload,cloudinary};
