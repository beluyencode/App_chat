import React from "react";


export default function FormSetProfile(props) {


    return (
        <div className="content-profile-setting-div-chil">
            <input className="content-proflie-setting-input" value={props.valueName} onChange={props.changeName}  placeholder="name"></input>
            <input className="content-proflie-setting-input" value={props.valuePhone} onChange={props.changePhone}placeholder="phone" ></input>
        </div>
    );
}