const express = require('express')
const Post = require('../models/post')
const router = express.Router()


// Pining 
router.get("/ping", (req, res)=>{
    res.status(200).send("Pinging work")
})






// Get all post 
router.get("/getAllPost", async (req, res) => {

    try {

        const responce = await Post.find();

        if (!responce) {
            res.status(500).json({ message: "No post found" })
        }


        console.log(`All post are fetched `);
        res.status(200).json(responce)


    } catch (error) {
        console.log(`Error while fetching all posts`);
        res.status(500).json({ message: error })


    }

})






// Single post with id
router.get("/getPost/:id", async (req, res) => {

    try {
        const id = req.params.id

        const responce = await Post.find({ _id: id });

        if (!responce) {
            res.status(500).json({ message: "No post found" })
        }


        console.log(`Post fetched` );
        res.status(200).json(responce)


    } catch (error) {
        console.log(`Error while fetching all posts`);
        res.status(500).json({ message: error })


    }

})


// Create post


router.post("/createPost", async (req, res) => {
    try {

        const data = req.body;
        const responce = await Post.create(data)

        // const responce = await newPost.save();

        if (!responce) {
            res.status(500).json({ message: "Internal server error while creating post" })
        }


        console.log(`Post Created`);
        res.status(200).json(responce)


    } catch (error) {
        console.log(`Error while creating post`);
        res.status(500).json({ message: error })
    }
})




// Update the post

router.put("/updatePost/:id", async(req, res)=>{
    try {
        const id = req.params.id
        const data = req.body;
        const responce = await Post.findByIdAndUpdate(id, data, {new:true})

        if(!responce){
              res.status(404).json({ message: "Post not found" })
        }
         console.log(`Post Updated`);
        res.status(200).json(responce)
        
    } catch (error) {
          console.log(`Error while updating post`);
        res.status(500).json({ message: error })
    }
})



router.delete("/deletePost/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const responce = await Post.findByIdAndDelete(id);

        if(!responce){
              res.status(404).json({ message: "Post not found" })
        }
        console.log(`Post Deleted`);
        res.status(200).json({message:"Post deleted successfully"})
        
        
    } catch (error) {
          console.log(`Error while deleting post`);
        res.status(500).json({ message: error })
    }
})


module.exports = router