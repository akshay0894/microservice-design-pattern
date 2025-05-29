
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import amqp from 'amqplib';
import PostModel from './post.model.js';

const PORT = process.env.PORT || 3001;


const app = express();
mongoose.connect(process.env.MONGO_URL);
app.use(bodyParser.json());

let channel;
amqp.connect('amqp://localhost').then((conn) => {
    return conn.createChannel();
}).then((ch) => {
    channel = ch;
    ch.assertQueue('comments');
    channel.consume('comments',async(msg) => {
        const newComment = JSON.parse(msg.content.toString());
        await PostModel.updateOne({_id: newComment.postId},{$inc:{commentCount:1}})
    },{noAck: true});
}).catch(console.warn);
app.get('/posts',async (req,res)=>{
    const posts= await PostModel.find();
    res.status(200).json({posts});
});

app.get('/posts/:userId',async (req,res)=>{
    const userId = req.params.userId;
    console.log(userId);
    const posts= await PostModel.find({userId});
    console.log("===", posts);
    res.status(200).json({posts});
});

app.post('/posts',async(req,res)=>{
    const{title,content,userId} = req.body;
    const post = await PostModel.create({title,content,userId});
    res.status(201).json({post});
});

app.listen(PORT,()=>{
    console.log(`Post service is running on port ${PORT}`);
});

