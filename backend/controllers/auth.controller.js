import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res, next)=> {

    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10); //hashSYnc is used to make the process synchronous. If we use hash we have to use await also
   
    console.log("hashed password", hashedPassword);
    try{
    const newUser = new User({username, email, password: hashedPassword});
   
        await newUser.save();
        res.status(201).json({message: "user created successfully"});
    }
    catch(error){
          next(error);
    }
   
};