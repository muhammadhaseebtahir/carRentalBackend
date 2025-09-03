const Booking = require("../models/Booking.Model");
const CarProduct = require("../models/AddProduct.Model");
const AuthUser = require("../models/Auth.model");

const checkAvaliability = async (car, pickUpDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickUpDate: { $lte: returnDate },
    returnDate: { $gte: pickUpDate },
  });

  return bookings.length === 0;
};

const checkAvaliabilityOfCar = async (req, res) => {
  const { location, pickUpDate, returnDate } = req.body;

  try {
    const cars = await CarProduct.find({ location, status: "available" });

    const availableCars = [];

    for (const car of cars) {
      const isAvailable = await checkAvaliability(
        car._id,
        pickUpDate,
        returnDate
      );
      if (isAvailable) {
        availableCars.push(car);
      }
    }

    return res.status(200).json({ availableCars });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ error: error.message });
  }
};

// *************create Booking***********

const createBooking = async (req, res) => {
  const { _id } = req._id;

  const { car, pickupDate, returnDate } = req.body;

  try {
    const isAvailable = await checkAvaliability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "Car is not available for the selected dates." });
    }
    const carData = await CarProduct.findById(car);
    const pickDate = new Date(pickupDate);
    const dateReturn = new Date(returnDate);
    const nowOfDays = Math.ceil(
      (dateReturn - pickDate) / (1000 * 60 * 60 * 24)
    );
    const price = nowOfDays * carData.pricePerDay;
    await  Booking.create({ car, user: _id, pickupDate: pickDate, returnDate: dateReturn, price });

    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ error: error.message });
  }
};

// ***********List user Booking*********

const getUserBooking = async (req, res) => {
  const { _id } = req;
  try {
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

      

    res.status(200).json({ bookings });


  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ error: error.message });
  }
};

// *************Owner Booking**********

const getOwnerBooking = async (req, res) => {
  const { _id } = req._id;
  try {
    const getUser = await AuthUser.findById(_id);
    if (getUser.role[0] !== "admin") {
      return res
        .status(404)
        .json({ status: "failed", message: "unauthorized access" });
    }
    const Bookings = await Booking.find().populate("car user").select("-user.password").sort({ createdAt: -1 });

    res.status(200).json({ Bookings }); 

 
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ error: error.message });
  }
};



// ***********Booking Status**********

const ChangeBookingStatus=async(req,res)=>{
    try{
        const {id,status}= req.body

        const booking = await Booking.findById(id)
        if(!booking){
            return res.status(404).json({message:"Booking not found"})
        }
        booking.status = status
        await booking.save()
        return res.status(200).json({message:"Booking status updated successfully"})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}



module.exports = {
    checkAvaliability,
    checkAvaliabilityOfCar,
    createBooking,
    getUserBooking,
    getOwnerBooking,
    ChangeBookingStatus
};