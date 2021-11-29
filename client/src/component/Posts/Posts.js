import React from "react";
import "./style.css";
import Avatar from '@mui/material/Avatar';

export default function Posts(props) {

    const like = () => {
        console.log("like");
    }
    
    const comment = () => {
        console.log("comment");
    }

    const share = () => {
        console.log("share");
    }

    return (
        <div className="post">
            <div className="post-info">
                <Avatar alt="" src="http://localhost:3000/img/avatar.jpg" />
                <a href="/">Long Pham Viet</a>
            </div>
            <div className="post-content">
                <div className="content-cap">
                   hom nay la ngay dep troi hahahahahahah
                </div>
                <img src="http://localhost:3000/img/post_img.jpg" alt="" />
            </div>
            <div className="underlined" ></div>
            <div className="post-like">
                <div className="post-like-btn">
                    <button onClick={like}>Like</button>
                </div>
                <div className="post-like-btn">
                    <button  onClick={comment}>Comment</button>
                </div>
                <div className="post-like-btn">
                    <button  onClick={share}>Share</button>
                </div>
            </div>
        </div>
    );
}