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
        res.status(201).json( "user created successfully");
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
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res.cookie('access_token', token, {httpOnly: true,  expires: expiryDate}).status(200).json(rest);
    }catch(error){
        next(error);
    }

}

export const google= async (req,res,next)=> {
  
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET );
         const {password: hashedPassword, ...rest} = user._doc;
         const expiryDate = new Date(Date.now() + 3600000); // 1 hour

         res.cookie('access_token', token, {httpOnly: true,  expires: expiryDate}).status(200).json(rest);

        }else{
             const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8)
             

             const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
             const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString() , email: req.body.email, password: hashedPassword, profilePicture: req.body.photo});

             await newUser.save();
             const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET );
             const {password: hashedPassword2, ...rest} = newUser._doc;
             const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    
             res.cookie('access_token', token, {httpOnly: true,  expires: expiryDate}).status(200).json(rest);
        }

    }catch(error){
        next(error)
    }

}

export const logout= (req,res)=> {

     res.clearCookie('access_token').status(200).json('Signout success!');
}