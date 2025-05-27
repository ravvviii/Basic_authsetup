const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user"); // adjust path if needed




// Pining 
router.get("/ping", (req, res)=>{
    res.status(200).send("Pinging work")
})


// Create account
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;


        const findUser = await User.findOne({ username });
        if (findUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            role,
            password: hash
        });

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, userid: user._id },
            "abcsdygf",
            { expiresIn: "1h" } // optional, but recommended
        );

        // Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "Lax"
        });

        res.status(201).json({ message: "User registered", user });

    } catch (error) {
        console.log(`Error while registering user: `, error);
        res.status(500).json({ message: "Internal server error" });
    }
});





// Create login
router.post("/login", async (req, res)=>{
    try {
        const {username, password} = req.body;
        let user = await User.findOne({username})
        if(!user){
            return res.status(401).send("No user present kindely register")
        }
        bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token =  jwt.sign({email:user.email, role: user.role ,userid:user._id}, "abcsdygf");
                res.cookie("token", token);
                
                console.log("Login successfull");
            res.status(200).json({"token":token,"Details":user})
            
        } 
            
            else res.status(401).send("Invalid credential")
    })
        
    } catch (error) {
        console.log(`Error while login user: `, error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,       // true if using HTTPS
        sameSite: "Strict", // or 'Lax'
    });
    res.status(200).json({ message: "Logout Successful" });
});



module.exports = router;
