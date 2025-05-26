const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user"); // adjust path if needed
const isLoggedIn = require("../middleware/authMiddleware");



router.get("/getAllUser", isLoggedIn,async(req, res)=>{
    try {
        const role = req.user.role
        if(role != "admin"){
            return res.status(401).send("Unauthorised")
        }

        const response = await User.find();
        if(!response) {
            return  res.status(500).json({ message: "No user found" })
        }
        console.log(`All user details found`);
        res.status(200).json({message:"All USer found", response})
        
        
    } catch (error) {
         console.log(`Error while getting all user: `, error);
        res.status(500).json({ message: "Internal server error" });
    }
})




router.get("/getUser/:id", isLoggedIn,async(req, res)=>{
    try {
         const role = req.user.role
        if(role != "admin"){
            return res.status(401).send("Unauthorised")
        }
        const id = req.params.id;
        const response = await User.findById(id)
        if(!response) {
            return  res.status(500).json({ message: "No user found" })
        }
        console.log(` User details found`);
        res.status(200).json({message:"All USer found", response})
        




    } catch (error) {
        console.log(`Error while getting specific user: `, error);
        res.status(500).json({ message: "Internal server error" });
    }
})


router.put("/updateUser/:id", isLoggedIn,async(req, res)=>{
    try {
         const role = req.user.role
        if(role != "admin"){
            return res.status(401).send("Unauthorised")
        }
        const id = req.params.id;
        const response = await User.findById(id)
        if(!response) {
            return  res.status(500).json({ message: "No user found" })
        }


        const data = req.body;
        const UpdatedDoc = await User.findByIdAndUpdate(id, data, {new:true})
        if(!UpdatedDoc){
            return  res.status(404).json({ message: "Post not found" })
        }
         console.log(`Post Updated`);
        res.status(200).json(UpdatedDoc)






    } catch (error) {
        console.log(`Error while getting specific user: `, error);
        res.status(500).json({ message: "Internal server error" });
    }
})






router.delete("/deleteUser/:id", isLoggedIn,async(req, res)=>{
    try {


         const role = req.user.role
        if(role != "admin"){
            return res.status(401).send("Unauthorised")
        }


        const id = req.params.id;
        const response = await User.findByIdAndDelete(id);
        // console.log(req.user.role);
        

        if(!response){
            return  res.status(404).json({ message: "User not found" })
        }
        console.log(`Post Deleted`);
        res.status(200).json({message:"User deleted successfully"})
        
        
    } catch (error) {
          console.log(`Error while deleting post`);
        res.status(500).json("Error")
    }
})



module.exports = router