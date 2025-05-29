
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import UserModel from './user.model.js';

const PORT = process.env.PORT || 3000;

const app = express();
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());

app.get('/users', async(req,res,next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({users});

        res.status(500).json({message:"Something went wrong"})
    }catch(error) {
        next(error);
    }
    
    

});

app.get('/users/:userId', async(req,res,next) => {
    try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    res.status(200).json({user});
    }catch(error){
        next(error);
    }
});

app.post('/users', async(req,res,next) => {
    try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
    }catch(error) {
        next(error);
    }

})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });
app.listen(PORT, () => {
 console.log("user service  is running on port ",PORT);
})
