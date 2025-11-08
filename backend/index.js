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
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("Sucessfully connected");
    app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})
}).catch((error)=>{
    console.log(error);
})


