const express = require("express")
const router = express.Router()
const verifyToken= require("../middlewares/AuthMiddleware")

const {  
    checkAvaliabilityOfCar,
    createBooking,
    getUserBooking,
    getOwnerBooking,
    ChangeBookingStatus}= require("../controllers/Booking.controller")

router.post("/check-avaliability",checkAvaliabilityOfCar)
router.post("/create-booking",verifyToken,createBooking)
router.get("/user-bookings",verifyToken,getUserBooking)
router.get("/admin-bookings",verifyToken,getOwnerBooking)
router.put("/change-booking-status",verifyToken,ChangeBookingStatus)



module.exports= router