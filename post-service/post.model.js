import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: String,
     content: String,
     commentCount: Number,
     userId: String
});

const PostModel = new mongoose.model('Post',postSchema);
export default PostModel;