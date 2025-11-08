import validator from "validator";
import { isEmpty } from "./is-empty.js";

export const validateRegisterInput=function(data){
    let errors={};

    data.name=!isEmpty(data.name)? data.name:"";
    data.email=!isEmpty(data.email)? data.email:"";
    data.password=!isEmpty(data.password)? data.password:"";


    if(!validator.isLength(data.name, {min:2, max:30})){
        errors.name='Name must be between 2 to 30 characters..';
    }

    if(validator.isEmpty(data.name)){
        errors.name='Name field is required..';
    }

    if(!validator.isEmail(data.email)){
        errors.email='Email is Invalid..';
    }

    if(validator.isEmpty(data.email)){
        errors.email='Email field is required..';
    }


    if(validator.isEmpty(data.password)){
        errors.password='password is required..';
    }

    if(!validator.isLength(data.password,{min:6, max:30})){
        errors.password='Password must be 6 character..';
    }




    return{
        errors,
        isValid:isEmpty(errors)
    }
};