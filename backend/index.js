import express from "express";
import mongoose from "mongoose";
import user from "./routes/user.js";
import passport from "passport";
import passportConfig from "./passport.js";
import cors from 'cors';
const app=express();

app.use(passport.initialize());
passportConfig(passport);

const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


// app.get("/",(req, res)=>{
//     res.send("Connecting");
// })
app.use('/user', user);
// mongoose.connect("mongodb+srv://arpan2003:arpan123@bookstore.o3puuyo.mongodb.net/").then(()=>{
//     console.log("Sucessfully connected");
//     app.listen(port, ()=>{
//     console.log(`Server is listening on port ${port}`);
// })
// }).catch((error)=>{
//     console.log(error);
// });

let isConnect=false;
async function connectToMongoDB(){
    try{
        await mongoose.connect("mongodb+srv://arpan2003:arpan123@bookstore.o3puuyo.mongodb.net/");
        isConnect=true;
        console.log("Connect to Mongodb");
    }catch(error){
        console.log(error);
    }
}

app.use((req,res,next)=>{
    if(!isConnect){
        connectToMongoDB();
    }
    next();
})
export default app;


