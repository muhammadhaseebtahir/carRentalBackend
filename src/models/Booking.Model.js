const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const bookingSchema= new mongoose.Schema({
    user:{type:ObjectId,ref:"User",required:true},
    car:{type:ObjectId,ref:"CarProduct",required:true},
    pickupDate:{type:Date,required:true},
    returnDate:{type:Date,required:true},
    price:{type:Number,required:true},
    status:{type:String,enum:["pending","confirmed","cancelled"],default:"pending"}
},{timestamps:true})

const Booking = mongoose.model("Booking",bookingSchema)
module.exports= Booking