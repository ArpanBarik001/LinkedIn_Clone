import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        text:String,
        date:{
            type:Date,
            default:Date.now
        }
    }]
});

export const User=mongoose.model('users', userSchema);