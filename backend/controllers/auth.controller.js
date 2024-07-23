import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res, next)=> {

    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10); //hashSYnc is used to make the process synchronous. If we use hash we have to use await also
   
    // console.log("hashed password", hashedPassword);
    try{
    const newUser = new User({username, email, password: hashedPassword});
   
        await newUser.save();
        res.status(201).json({message: "user created successfully"});
    }
    catch(error){
          next(error);
    }
   
};

export const login= async (req,res,next)=> {
    const {email, password} = req.body;

    try{
        const validUser = await User.findOne({email});

        if(!validUser) return next(errorHandler(404, "user not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Invalid password"));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        
        const { password: hashedPassword, ...rest} = validUser._doc;
       
        // Set cookie with an expiry date
    const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now

        res.cookie('access_token', token, {httpOnly: true,  expires: oneDayFromNow}).status(200).json(rest);
    }catch(error){
        next(error);
    }

}