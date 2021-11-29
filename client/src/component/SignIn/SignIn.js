import React, { useState, useEffect } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn({whenLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [checkpassword, setCheckPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [messageResponse, setmessageResponse] = useState("");
    const [disableBtn,setDisableBtn] = useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    //check email address
    const checkEmailSignin = (email) => {
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        return pattern.test(email);
    }

    //on change email 
    const onEmailChange = (event) => {
        setEmail(event.target.value);

    }

    //onchange password
    const onPasswordChange = (event) => {
        setPassword(event.target.value);

    }

    useEffect(() => {
        if (checkEmailSignin(email)) {
            setCheckEmail("none");
        } else {
            setCheckEmail("block")
        }
        if (password.length >= 8) {
            setCheckPassword("none");
        } else {
            setCheckPassword("block")
        }
        if (checkEmailSignin(email) && password.length >= 8) {
            setDisableBtn(false);
        }else {
            setDisableBtn(true);
        }


    }, [email, password])

    //sign in 
    const clickSignIn = () => {

        var body = {
            email: email,
            password: password
        }
        // open dialog loading
        setOpen(true);
        //header req
        var header = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch("http://localhost:5000/user", header)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.message === "successful") {
                    localStorage.setItem('accessToken', data.accessToken); 
                    whenLogin(true);
                    
                }
                setmessageResponse(data.message);
            })
            .catch(err => {
                console.error(err);
            });

    }

    if (messageResponse === "successful") {
        return (<Redirect to="/" />);
    }

    return (
        <>
            <div className="full-screen">
                <div className="goHome">
                    <a href="/">LONELY CAT</a>
                </div>
                <div className="SignIn">
                    <h1> Đăng Nhập Hội Viên</h1>
                    <div className="SignIn-form">
                        <form method="post" >
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" id="email" value={email} onChange={onEmailChange}></input>
                            <div style={{ display: checkEmail }}>
                                <img src="http://localhost:3000/img/icon.png" className="icon-canhbao" alt=""></img>
                                <p style={{ textAlign: 'left', lineHeight: "30px" }}> Vui lòng nhập địa chỉ email</p>
                            </div>
                            <label htmlFor="password" className="label">Mật khẩu</label>
                            <input type="password" id="password" value={password} onChange={onPasswordChange}></input>
                            <div style={{ display: checkpassword }}>
                                <img src="http://localhost:3000/img/icon.png" className="icon-canhbao" alt=""></img>
                                <p style={{ textAlign: 'left', lineHeight: "30px" }}>Vui lòng nhập mật khẩu</p>
                            </div>
                            <a href="/">Quên Mật Khẩu</a>
                            <br />
                            <button type="button" onClick={clickSignIn} disabled={disableBtn} className='btn btn-signin'>Đăng nhập</button>
                        </form>
                        <p >
                            Không phải hội viên?
                            <a href="/SignUp"><span className="a-dangky"> Tham Gia Miễn Phí Ngay!</span></a>
                            <br />
                            <br />
                            <span style={{ fontSize: 15 }}>Khám phá thêm về LONELY CAT:</span>
                            <br />
                            <a href="https://www.facebook.com/profile.php?id=100008940035627" target="_blank" rel="noopener noreferrer">
                                <img src="http://localhost:3000/img/fb.png" alt=""></img>
                            </a>
                            <a href="/SignIn">
                                <img src="http://localhost:3000/img/instagram.png" alt=""></img>
                            </a>
                            <a href="/SignIn">
                                <img src="http://localhost:3000/img/twt.png" alt=""></img>
                            </a>
                            <a href="/SignIn">
                                <img src="http://localhost:3000/img/ytube.png" alt=""></img>
                            </a>
                            <a href="/SignIn">
                                <img src="http://localhost:3000/img/pinterest.png" alt=""></img>
                            </a>

                        </p>
                        <p style={{ fontSize: 10, marginTop: 10 }}>
                            © 2021 - Bản quyền của Công Ty Cổ Phần PVL<br />
                            Giấy chứng nhận Đăng ký do hội người FA Việt Nam cấp ngày 19/10/2021
                        </p>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đang tiến hành đăng nhập "}</DialogTitle>
                <DialogContent>

                    <div className="load">
                        {messageResponse === "error" ?
                            <p style={{ fontSize: 15 }}>Tài khoản hoặc mật khẩu của bạn sai<br />vui lòng đăng nhập lại</p>
                            :
                            <CircularProgress color="inherit" />
                        }
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">Trở lại</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};