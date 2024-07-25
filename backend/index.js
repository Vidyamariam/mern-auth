import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=> {

    console.log("connected to mongodb");
}).catch((err)=> {
    console.log(err);
});

const app = express();

app.use(express.json());

app.use(cookieParser());

const port = 3000;
app.listen(port, ()=> {
    console.log(`sever listening on https://localhost:${port}`);
});

app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);

//Middleware to handle errors
app.use((err, req, res, next)=> {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})