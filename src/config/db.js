const mongoose = require("mongoose")

// require("dotenv").config()

const dbConnected = ()=>{
    mongoose.connect("mongodb+srv://malikhaseeb456070:A97xZiknmsHiOoSH@cluster0.gly3v.mongodb.net/",{
        dbName:"carRental"
    }).then(()=>{
        console.log("Mongo  DB is connected")
    }).catch((err)=>{
        console.log("connecting error",err)
    })
}
module.exports= dbConnected


// const mongoose = require("mongoose")

// require("dotenv").config()

// const dbConnected = ()=>{
//     mongoose.connect(process.env.MONGO_URL,{
//         dbName:"carRental"
//     }).then(()=>{
//         console.log("Mongo  DB is connected")
//     }).catch((err)=>{
//         console.log("connecting error",err)
//     })
// }
// module.exports= dbConnected


