import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    text: String
});

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;