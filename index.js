const express = require("express")
const cors = require("cors")
const bodyparser= require("body-parser")

const Auth = require("./src/routes/Auth.routes")

const dbConnected= require("./src/config/db")



require("dotenv").config()


const app = express()

dbConnected()
app.use(cors())
app.use(bodyparser.json())


app.get("/",(req,res)=>{
    res.send("Hello How are you.");
})

const PORt = process.env.PORT || 8000
app.listen(PORt,()=>{
    console.log(`Server is running is Port ${PORt}`)
})





app.use("/auth",Auth)