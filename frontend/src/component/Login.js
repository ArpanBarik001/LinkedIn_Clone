import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './css/register.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const[email, setemail]=useState('');
  const[password, setpassword]=useState('');
  const[errors,seterrors]=useState({});
  const navigate=useNavigate();
  const handlesubmit=()=>{
    const data={
        email,
        password
    };
    axios
    .post("https://linked-in-clone-chi-ten.vercel.app/user/login",data)
    .then((response)=>{
        localStorage.setItem("token",response.data.token);
        navigate('/post');
    })
    .catch((error)=>{
        console.log(error);
        seterrors(error.response.data);

    })
}
  return (
    <div className='container'>
      <div className="signup">
        <h2>Login</h2>
        <div className="inputBox">
          <input type="text" required="required" 
           value={email}
           onChange={(e)=>setemail(e.target.value)}
           />
          <i className="fa-solid fa-envelope"></i>
          <span>email</span>
          <div>{errors.email}</div>
        </div>
        <div className="inputBox">
          <input type="text" required="required"
           value={password}
           onChange={(e)=>setpassword(e.target.value)}
           />
           <i className="fa-solid fa-lock"></i>
          <span>password</span>
          <div>{errors.password}</div>
        </div>
       
        
        <div className="inputBox">
          <input type="submit" onClick={handlesubmit} value="Login"/>
        </div>
        <p>Create Account <Link to='/' className='login'>Sign Up</Link></p>
      </div>
    </div>
  )
}
