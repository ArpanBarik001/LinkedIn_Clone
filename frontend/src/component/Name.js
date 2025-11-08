import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/name.css';
import { Link } from "react-router-dom";

export default function Name() {
    const [name, setName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchName = async () => {
            try {
                const response = await axios.get("https://linked-in-clone-sepia.vercel.app/user/name", {
                    headers: { Authorization: `${token}` }, 
                });
                setName(response.data); 
            } catch (error) {
                console.log(error);
            }
        };

        fetchName();
    }, []); // run once on mount

    return (
         <div className="navbar">
            <Link className="navbar-left" to='/text'>Create Post</Link>
            <div className="navbar-right">{name}</div>
         </div>

    );
}
