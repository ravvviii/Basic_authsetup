const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user"); // adjust path if needed
const isLoggedIn = require("../middleware/authMiddleware")


router.get("/getAllUser", isLoggedIn,async(req, res)=>{
    try {
        const role = req.user.role
        if(role != "admin"){
            return res.status(401).send("Unauthorised")
        }

        const responce = await User.find();
        if(!responce) {
            return  res.status(500).json({ message: "No user found" })
        }
        console.log(`All user details found`);
        res.status(200).json({message:"All USer found", responce})
        
        
    } catch (error) {
         console.log(`Error while getting all user: `, error);
        res.status(500).json({ message: "Internal server error" });
    }
})



module.exports = router