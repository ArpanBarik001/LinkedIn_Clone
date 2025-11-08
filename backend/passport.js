import { Strategy as jwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
// import mongoose from "mongoose";
import { User } from "./models/User.js";
import { secretOrkey } from "./keys.js";

import passport from "passport";


const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=secretOrkey;

export default(passport)=>{

    passport.use(
        new jwtStrategy(opts, async(jwt_payload, done)=>{
            try{
                const find=await User.findOne({email:jwt_payload.email});
                if(find){
                    return done(null, find);
                }else{
                    return done(null, false);
                }

            }catch(error){
                return done(error, false);
                
            }
        })
    );


};
    