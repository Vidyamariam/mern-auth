import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js'; //for backend we always have to add the .js extension.


export const verifyToken = (req,res,next)=> {
    const token = req.cookies.access_token;

    if(!token){
       
         return next(errorHandler(401,'You are not authenticated' ));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err) return res.status(403).json("Token is not valid");

        req.user = user;
        next();

    })

}