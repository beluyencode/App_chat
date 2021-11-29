import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import Posts from "../Posts/Posts";
import Item from "../Item/Item";
import Avatar from '@mui/material/Avatar';
import { RiSettings5Fill } from 'react-icons/ri';
import { BiHelpCircle } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import SetProfile from "../SetProfile/SetProfile";
import LoadingPage from "../LoadingPage/LoadingPage";
import io from "socket.io-client";
import ChatBox from "../ChatBox/ChatBox";

const host = "http://localhost:5000/";

export default function HomeUser({ logout, errorServer }) {

    const [showMenu, setShowMenu] = useState("none");
    const [user, setUser] = useState();
    const [userOnline, setUserOnline] = useState([]);
    const [openChatBox, setOpenChatBox] = useState(true);
    const [userChatBox,setUserChatBox] = useState({});
    let history = useHistory();
    const socketRef = useRef();

    useEffect(() => {
        var promise = new Promise((resolve, reject) => {
            //token 
            var header = {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }

            //hearder
            var reqOptions = {
                method: "GET",
                headers: header
            }

            fetch("http://localhost:5000/user", reqOptions)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.message === "successful") {
                        setUser(data.user);
                        resolve(data);
                    }
                    if (data.message === "error") {
                        handleErrorServer();
                        reject();
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject();
                })
        })
        promise
            .then((data) => {

                socketRef.current = io.connect(host, { transports: ['websocket'] });

                socketRef.current.emit("UserOnline", { id: data.user.id, name: data.user.name })

                socketRef.current.on("dataUserOnline", (data) => {
                    setUserOnline(data);
                    console.log(data);
                })

            })
            .catch(error => {

            })

        return () => {
            socketRef.current.disconnect();
        }

    }, [])


    const goProfile = () => {
        history.push("/Profile/1")
    }

    const onClickLogout = () => {
        socketRef.current.disconnect();
        logout();
    };

    const handleErrorServer = () => {
        socketRef.current.disconnect();
        errorServer();
    }

    const onClickSetting = () => {
        console.log("home user");
    }

    const clickShowMenu = () => {
        if (showMenu === "none") {
            setShowMenu("block");
        } else {
            setShowMenu("none")
        }
    }

    const handleOpenChatBox = (user) => {
        setUserChatBox(user);
        setOpenChatBox(false);
        console.log(user);
    }

    const handleCloseChatBox = () => {
        setOpenChatBox(true);
    }
   

    const onClick = (e) => {
        console.log("click");
    }

    if (user === undefined) {
        return <LoadingPage />
    } else if (user.name === "") {
        return <SetProfile />
    } else {
        return (
            <>
                <div style={{ position: "relative" }}>
                    {openChatBox===true ? <div></div> : <ChatBox user={user} userFriend={userChatBox} socket={socketRef} close={handleCloseChatBox}/>}
                    <div className="navbar-user">
                        <div className="navbar-logo">
                            <a href="/">LONELY CAT</a>
                            <input className="navbar-search" type="text" placeholder="Search..."></input>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-end-item">
                                <Item userName={user.name} userAvatar="http://localhost:3000/img/avatar.jpg" onClick={onClick} />
                                <div className="navbar-btn-menu">
                                    <svg viewBox="0 0 28 28" height="20" width="20"  >
                                        <path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z" />
                                    </svg>
                                    <span className="btn-menu-new">
                                        1
                                    </span>
                                </div>
                                <div className="navbar-btn-menu">
                                    <svg viewBox="0 0 28 28" height="20" width="20"  >
                                        <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z" />
                                    </svg>
                                    <span className="btn-menu-new">
                                        1
                                    </span>
                                </div>
                                <div className="navbar-btn-menu" style={{ position: 'relative' }} onClick={clickShowMenu} >
                                    <svg viewBox="0 0 20 20" height="1em" width="1em"  >
                                        <path d="M10 14a1 1 0 0 1-.755-.349L5.329 9.182a1.367 1.367 0 0 1-.205-1.46A1.184 1.184 0 0 1 6.2 7h7.6a1.18 1.18 0 0 1 1.074.721 1.357 1.357 0 0 1-.2 1.457l-3.918 4.473A1 1 0 0 1 10 14z" />
                                    </svg>
                                </div>
                                <div className="menu-setting-user" style={{ position: "absolute", display: showMenu }}>
                                    <div style={{ padding: "6px 10px" }}>
                                        <div className="item">
                                            <div style={{ padding: 4, display: 'flex' }} onClick={goProfile} >
                                                <Avatar alt="" src="http://localhost:3000/img/avatar.jpg" sx={{ width: 50, height: 50 }} />
                                                <div style={{ height: 50, textAlign: "left" }}>
                                                    <span style={{ lineHeight: "12px", fontSize: "14px", fontWeight: 500 }}>
                                                        {user.name}
                                                        <span style={{ display: "block", lineHeight: "12px", fontSize: "10px" }}>
                                                            Xem trang cá nhân của bạn
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="underlined" style={{ marginBottom: 7 }}></div>
                                        <div className="select" onClick={onClickSetting}>
                                            <div>
                                                <span className="span-icon">
                                                    <RiSettings5Fill />
                                                </span>
                                            </div>
                                            <span>
                                                Cài đặt & quyền riêng tư
                                            </span>
                                        </div>
                                        <div className="select">
                                            <div>
                                                <span className="span-icon">
                                                    <BiHelpCircle />
                                                </span>
                                            </div>
                                            <span>
                                                Trợ giúp & hỗ trợ
                                            </span>
                                        </div>
                                        <div className="select" onClick={onClickLogout}>
                                            <div>
                                                <span className="span-icon">
                                                    <BiLogOut />
                                                </span>
                                            </div>
                                            <span>
                                                Đăng xuất
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="main-page">
                        <div className="Content">
                            <div className="menu">
                                <div style={{ paddingTop: 10 }}>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName={user.name} userAvatar="http://localhost:3000/img/avatar.jpg" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Bạn bè" userAvatar="http://localhost:3000/img/banbe.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Nhóm" userAvatar="http://localhost:3000/img/team.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Market" userAvatar="http://localhost:3000/img/market.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Kỷ niệm" userAvatar="http://localhost:3000/img/kiniem.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Watch" userAvatar="http://localhost:3000/img/watch.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Đã lưu" userAvatar="http://localhost:3000/img/daluu.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Sự kiện" userAvatar="http://localhost:3000/img/event.png" onClick={onClick} />
                                    </div>
                                    <div className="underlined" style={{ marginBottom: 7 }}></div>
                                    <div style={{ paddingLeft: 10, marginBottom: 10 }}>
                                        Khác
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Thời tiết" userAvatar="http://localhost:3000/img/thoitiet.png" onClick={onClick} />
                                    </div>
                                    <div style={{ paddingBottom: 10 }}>
                                        <Item userName="Trực tiếp" userAvatar="http://localhost:3000/img/tructiep.png" onClick={onClick} />
                                    </div>
                                </div>

                            </div>
                            <div className="news">
                                <Posts></Posts>
                                <Posts></Posts>
                                <Posts></Posts>
                                <Posts></Posts>

                            </div>
                            <div className="friends">
                                <div className="friends-online">
                                    <span className="friends-span">Bạn bè
                                        <span style={{ float: 'right', paddingRight: 10 }}>icon</span>
                                    </span>
                                </div>
                                {userOnline.map((item, index) => {
                                    if (item.id === user.id) {
                                        return (
                                            <div key={index} style={{ display: "none" }}></div>
                                        );
                                    }
                                    return (
                                        <div style={{ paddingBottom: 10 }} key={index}>
                                            <Item userName={item.name}
                                                userAvatar="http://localhost:3000/img/avatar.jpg"
                                                onClick={() => { handleOpenChatBox(item) }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}