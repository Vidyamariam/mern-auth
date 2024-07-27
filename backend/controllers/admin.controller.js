import Admin from "../Models/admin.model.js";
import User from "../Models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const login= async (req,res,next)=> {
   
    const adminData = {
        email: req.body.email,
        password: req.body.password,
    }
    //  console.log(adminData);

     try{
        const existingAdmin = await Admin.findOne({});
        
        if (!existingAdmin) {
            const hashedPassword = bcryptjs.hashSync(process.env.ADMIN_PASSWORD, 10);
            
            const newAdmin = new Admin({
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword ,
            });
            
            await newAdmin.save();
            console.log('Initial admin account created.');
        } 
      
        const adminDetails = await Admin.findOne({ email: adminData.email });
        
        // console.log("Admin details in backend", adminDetails);
        
        if (!adminDetails) {
            return next(errorHandler(401, "Invalid credentials"));
        }
  
        const isPasswordCorrect = bcryptjs.compareSync(adminData.password, adminDetails.password);
        if (!isPasswordCorrect) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        // Proceed with the login logic, e.g., generating a token, etc.
        res.status(200).json( "Login successful");

     }catch(error){

        console.log(error);
     }

     
}

export const getUsers= async (req,res,next)=> {

    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){

        next(errorHandler(500, 'Failed to fetch Users'));
    }
      
}

export const createUser= async (req,res,next)=> {

       const {username, email, password, profilePicture} = req.body;

       const hashedPassword = bcryptjs.hashSync(password,10); 
    //    console.log(req.body);
       try{
         const newUser = new User({

            username,
            email,
            password: hashedPassword,
            profilePicture: profilePicture
         });
          console.log("new User created", newUser);
         await newUser.save();
         res.status(201).json( "user created successfully");

       }catch(error){

        next(error);
       }
}

export const editUser = (req,res, next)=> {
    
     
     
}