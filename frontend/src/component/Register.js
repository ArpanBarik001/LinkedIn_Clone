import React, { useState } from 'react'
import axios from 'axios';
import './css/register.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Register() {
  const[name, setname]=useState('');
  const[email, setemail]=useState('');
  const[password, setpassword]=useState('');
  const[errors,seterrors]=useState({});
  const navigate=useNavigate();
  const handlesubmit=()=>{
    const data={
        name,
        email,
        password
    };
    axios
    .post("http://localhost:5000/user/register",data)
    .then(()=>{
        navigate('/login');
    })
    .catch((error)=>{
        seterrors(error.response.data);

    })
}
  return (
    <div className='container'>
      <div className="signup">
        <h2>Sign Up</h2>
        <div className="inputBox">
          <input type="text" required="required"
           value={name}
           onChange={(e)=>setname(e.target.value)}
            />
          <i className="fa-solid fa-user"></i>
          <span>name</span>
          <div>{errors.name}</div>
        </div>
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
          <input type="submit" onClick={handlesubmit} value="Create Account"/>
        </div>
        <p>Already a member ? <Link to='/login' className='login'>Log in</Link></p>
      </div>
    </div>
  )
}
