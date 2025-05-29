
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import amqp from 'amqplib';
import CommentModel from './comment.model.js';

const PORT = process.env.PORT || 3002;

const app = express();
mongoose.connect(process.env.MONGO_URL);
app.use(bodyParser.json());

let channel; 

amqp.connect('amqp://localhost').then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    channel = ch;
    return channel.assertQueue('comments');
  }).catch(console.warn);

app.get('/comments',async (req,res) =>{
    const comments = await CommentModel.find();
    res.json({comments});
});

app.get('/comments/:userId',async(req,res) =>{
    const userId = req.params.userId;
    console.log(userId);
    const comments = await CommentModel.find({userId});
    console.log('===c',comments);
    res.json({comments});
});

app.post('/comments',async(req,res) =>{
   const {userId, postId, text} = req.body;
   const newComment = await CommentModel.create({userId,postId,text});
   console.log(newComment);
   channel.sendToQueue('comments', Buffer.from(JSON.stringify(newComment)));
   res.status(201).json({newComment});
});


app.listen(PORT, () =>{
    console.log(`Comment service is running on port ${PORT}`);
})

