const express = require('express')
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const db = require('./db')


const postRoute = require("./routes/postRoutes")
const userRoute  = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")

// Body-Parser middleware
app.use(bodyParser.json());  
const cookieParser = require("cookie-parser");
app.use(cookieParser());



app.get("/ping", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
app.get("/", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
 









app.use("/post" ,postRoute)
app.use("/user" ,userRoute)
app.use("/admin",adminRoute)



const port = process.env.PORT ||3000
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
    
})