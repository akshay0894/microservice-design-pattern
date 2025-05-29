
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 3003;
const USER_SERVICE_URL = 'http://localhost:3000';
const POST_SERVICE_URL = 'http://localhost:3001';
const COMMENT_SERVICE_URL = 'http://localhost:3002';

const app = express();
app.use(bodyParser.json());


app.get('/aggregate/:userId', async(req,res) => {
    try {
  
        const userId = req.params.userId;
        const userInfo = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
        const user = userInfo.data.user;
  
        const postsResponse = await axios.get(`${POST_SERVICE_URL}/posts/${userId}`);
        const posts = postsResponse.data.posts;

        const commentsResponse = await axios.get(`${COMMENT_SERVICE_URL}/comments/${userId}`);
        const comments = commentsResponse.data.comments;
        console.log(posts[0]._id);
        console.log(comments)
        const postWithComments = posts.map(post => ({
            ...post,
            comments: comments.filter(comment => comment.postId === post._id.toString() )
        }));

          res.status(200).json({  user, posts: postWithComments});  
        

    }catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.listen(PORT, () => {
    console.log(`aggregrator service is running on port ${PORT}`);
});

