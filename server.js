const express = require('express')
const app = express();




app.get("/ping", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})
app.get("/", (req, res)=>{
    res.status(200).json({message:"hello i am pinging"})
})




const port = 3000
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
    
})