import React from "react";
import "./style.css";
import Avatar from '@mui/material/Avatar';



export default function Item(props) {
    return (
        <div className="item"> 
            <div style={{ padding: 4, display: 'flex' }}  onClick={props.onClick}>
                <Avatar alt="" src={props.userAvatar} sx={{ width: 30, height: 30 }} />
                <span>{props.userName}</span>
            </div>
        </div>
    );
}