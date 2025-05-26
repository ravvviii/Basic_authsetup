const express = require('express')
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const db = require('./db')


const postRoute = require("./routes/postRoutes")

// Body-Parser middleware
app.use(bodyParser.json());  // It will save in req.body


app.get("/ping", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
app.get("/", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
 


app.use("/post", postRoute)

const port = process.env.PORT ||3000
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
    
})