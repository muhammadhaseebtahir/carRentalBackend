const mongoose = require("mongoose")

require("dotenv").config()

const dbConnected = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"carRental"
    }).then(()=>{
        console.log("Mongo  DB is connected")
    }).catch((err)=>{
        console.log("connecting error",err)
    })
}
module.exports= dbConnected


