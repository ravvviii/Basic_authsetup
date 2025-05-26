const express = require('express')
const Post = require('../models/post')
const router = express.Router()
const User = require("../models/user")
const isLoggedIn = require("../middleware/authMiddleware")



// Pining 
router.get("/ping", (req, res)=>{
    res.status(200).send("Pinging work")
})






// Get all post 
router.get("/getAllPost",isLoggedIn, async (req, res) => {

    try {

        const response = await Post.find().populate("author");

        if (!response) {
           return res.status(500).json({ message: "No post found" })
        }


        console.log(`All post are fetched `);
        res.status(200).json(response)


    } catch (error) {
        console.log(`Error while fetching all posts`);
        res.status(500).json({ message: error })


    }

})






// Single post with id
router.get("/getPost/:id", isLoggedIn,async (req, res) => {

    try {
        const id = req.params.id

        const response = await Post.findById(id);

        if (!response) {
         return   res.status(500).json({ message: "No post found" })
        }


        console.log(`Post fetched` );
        res.status(200).json(response)


    } catch (error) {
        console.log(`Error while fetching all posts`);
        res.status(500).json({ message: error })


    }

})


// Create post


router.post("/createPost",isLoggedIn, async (req, res) => {
    try {

        const data = req.body;
        
       
        
        
        const email = req.user.email
        
        const postUser = await User.findOne({email:email})
        if (!postUser) {
            return res.status(404).json({ message: "Author not found" });
        }


        const response = await Post.create({
            ...data,
            author:postUser._id

        })
         // const response = await newPost.save();
        
        if (!response) {
            return   res.status(500).json({ message: "Internal server error while creating post" })
        }

    postUser.posts.push(response._id)
    await postUser.save()



        console.log(`Post Created`);
        
        res.status(200).json(response)


    } catch (error) {
        console.log(`Error while creating post`);
        res.status(500).send(error )
    }
})




// Update the post

router.put("/updatePost/:id", isLoggedIn,async(req, res)=>{
    try {
        const id = req.params.id
        const data = req.body;
        const response = await Post.findByIdAndUpdate(id, data, {new:true})

        if(!response){
            return  res.status(404).json({ message: "Post not found" })
        }
         console.log(`Post Updated`);
        res.status(200).json(response)
        
    } catch (error) {
          console.log(`Error while updating post`);
        res.status(500).json({ message: error })
    }
})



router.delete("/deletePost/:id", isLoggedIn,async(req, res)=>{
    try {
        const id = req.params.id;
        const response = await Post.findByIdAndDelete(id);
        // console.log(req.user.role);
        

        if(!response){
            return  res.status(404).json({ message: "Post not found" })
        }
        console.log(`Post Deleted`);
        res.status(200).json({message:"Post deleted successfully"})
        
        
    } catch (error) {
          console.log(`Error while deleting post`);
        res.status(500).json("Error")
    }
})


module.exports = router