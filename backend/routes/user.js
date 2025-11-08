import express from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/User.js";
import { validateLoginInput } from "../validation/login.js";
import { validateRegisterInput } from "../validation/register.js";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { secretOrkey } from "../keys.js";


const router=express.Router();


router.post('/register',async(req, res)=>{
    try{
    const{errors, isValid}=validateRegisterInput(req.body);
    if(!isValid){
        return res.status(500).json(errors);
    }
    const userExist=await User.findOne({email:req.body.email});
    if(userExist){
        errors.email="Email already exist.."
        return res.status(500).json(errors);
    }

    const newUser={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    newUser.password=await bcrypt.hash(newUser.password, 10);
    const newRegister=await User.create(newUser);

    return res.status(200).json({
        name:newRegister.name,
        email:newRegister.email,
        password:newRegister.password
    })


    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
    


});





router.post('/login', async(req, res)=>{

    try{
        const{errors, isValid}=validateLoginInput(req.body);
        if(!isValid){
            return res.status(500).json(errors);
        }
        const find=await User.findOne({email:req.body.email});
    if(!find){
        errors.email='User not found..';
        return res.status(500).json(errors);
        
    }
   const isMatch=await bcrypt.compare(req.body.password, find.password);
   if(isMatch){
        const payload={email:find.email, name:find.name};

            jwt.sign(payload, secretOrkey, {expiresIn: 3600}, (err, token)=>{
                if(err) throw err;
                return res.json({
                    success: true,
                    token: 'Bearer' +" "+token,
                    user:{
                        name:find.name,
                        email:find.email
                    }
                });

            });
        
    }else{
        errors.password='Password not match';
        return res.status(500).json(errors);
    }

    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }


});




router.post("/text",passport.authenticate("jwt", { session: false }), async(req, res)=>{
    // console.log("hit", req.body);
    try{
    // console.log(req.headers);
    // console.log("REQ.USER",req.user);
    const find=await User.findOne({email:req.user.email});
    if(!find){
        return res.status(500).send("User not found");
    }
    find.posts.push({text:req.body.text});
    await find.save();

    return res.status(200).json({
        name:find.name,
        text:find.posts[find.posts.length-1].text,
        date:find.posts[find.posts.length-1].date
    });

    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }

});




router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.find({}, { name: 1, posts: 1, _id: 0 });
      const allPosts = users.flatMap((user) =>
        user.posts.map((post) => ({
          name: user.name,
          text: post.text,
          date: post.date,
        }))
      );
      allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      const loginUserName = req.user.name;
      return res.status(200).json(allPosts);
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  }
);

router.get('/name',  passport.authenticate("jwt", { session: false }), async(req, res)=>{
    const find=req.user.name;
    return res.status(200).json(find);
})

export default router;