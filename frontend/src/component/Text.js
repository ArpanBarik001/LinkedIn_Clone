import React, { useState } from 'react'
import axios from 'axios';
import './css/text.css';
import { useNavigate } from 'react-router-dom';
export default function Text() {
    const[text, settext]=useState('');
    const[loading, setloading]=useState(false);
    const[error, seterror]=useState('');
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!text.trim()) {
        seterror("Text cannot be empty.");
        return;
        }
        setloading(true);
        seterror("");
        const data={
            text
        };
        const token=localStorage.getItem("token");
        axios.post("https://linked-in-clone-chi-ten.vercel.app/user/text",data, {headers:{Authorization:`${token}`},})
        .then(()=>{
            settext("");
            alert("Post Created Successfully");
            navigate('/post');
            
        }).catch((error)=>{
            seterror(error);
        });
        setloading(false);
    }
  return (
    <div className='craete-post'>
      <div className="create-post-card">
        <textarea
         value={text}
         onChange={(e)=>settext(e.target.value)}
         placeholder={error ? error : "What's on your mind?"}
         required="required"
         rows="15"
         ></textarea>

        <button type="submit" disabled={loading} onClick={handleSubmit}>
         {loading ? "Posting..." : "Create Post"}
        </button>
      </div>
    </div>
  )
};
