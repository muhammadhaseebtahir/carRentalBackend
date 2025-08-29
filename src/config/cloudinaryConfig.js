const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "doizr9lup", // Replace with your Cloudinary cloud name
  api_key: "471676845146623", // Replace with your Cloudinary API key
  api_secret: "j8sNX2c2h79G60GhHu_cbHA3Uow", // Replace with your Cloudinary API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
