import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    Title:String,
    Poster:String,
    Director:String,
    Genre:String,
    Runtime:String,
    Plot:String,
    YourReview:String,
    SharedBy:String,
    Ott:String,
    Family:String

})
const Post = mongoose.model('Post',PostSchema)
export default Post