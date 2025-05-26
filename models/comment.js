// Comment {
//   content,
//   author: UserRef,
//   post: PostRef,
//   createdAt,
//   updatedAt
// }






const mongoose = require('mongoose')



const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
}, {
    timestamps:true
})




module.exports = mongoose.model("Comment", commentSchema)