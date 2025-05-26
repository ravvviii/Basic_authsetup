const express = require('express')
const app = express();
require('dotenv').config();
const db = require('./db')


app.get("/ping", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
app.get("/", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
 


const port = process.env.PORT ||3000
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
    
})