import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/post.css";
import Name from "./Name.js";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/user/posts", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <Name/>
            <div className="feed-container">
            <h2 className="feed-title">All User Posts</h2>

            {loading ? (
                <p className="loading">Loading posts...</p>
            ) : posts.length === 0 ? (
                <p className="no-users">No posts found.</p>
            ) : (
                <div className="feed-list">
                    {posts.map((post, i) => (
                        <div key={i} className="user-section">
                            <h3 className="user-name">{post.name}</h3>
                            <div className="post-card">
                                <p className="post-text">{post.text}</p>
                                <span className="post-date">
                                    {new Date(post.date).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
        </div>
    );
}

