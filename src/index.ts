import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import users from './controllers/users';
// import UserSchema, { User } from './models/user';

// load environment
dotenv.config();

// connect mongoose
mongoose.connect(
    process.env.MONGO_CONNECT_URL,
    {
        useNewUrlParser: true,
    }
).then(
    () => {
        console.log('MongoDB connected successfuly');
    },
    err => {
        console.error('MongoDB wasn\'t connected');
        console.error(err);
    }
);

// prepare app
const app = express();

// connect controllers
app.use('/users', users);

// starting server
app.listen(process.env.SERVER_PORT, () => {
    console.log('server started successfuly');
});
