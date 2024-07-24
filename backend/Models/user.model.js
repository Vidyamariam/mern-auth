import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

     username: {
        type: String,
        required: true,
        unique: true
     },
     email: {
        type: String,
        required: true,
        unique: true
     },
     password: {
        type: String,
        required: true,
     },
     profilePicture:{
       type: String,
       default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
     }

}, {timestamps: true});  //timestamps is to add 2 extra information to each user document- time of creation and time of edit

const User = mongoose.model('User', userSchema);

export default User;