const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
        
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'',
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'',

    }],
    

}, {timestamps:true})



module.exports = mongoose.model('Post', postSchema)