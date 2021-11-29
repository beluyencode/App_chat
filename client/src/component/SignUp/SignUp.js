import React, { useState,useEffect } from "react";
import "./style.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router-dom";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const changeElement = (message) => {
    if(message === "error") {
        return (<p style={{ fontSize: 15 }}>Đã xảy ra lỗi<br />vui lòng thử đăng ký lại sau !</p>);
    }else if (message === "successful") {
        return (<p style={{ fontSize: 15 }}>Đăng ký thành công<br />bạn đã có thể đăng nhập vào LONELY CAT !</p>);
    }else if (message === "errorEmail") {
        return (<p style={{ fontSize: 15 }}>Email của bạn đã tồn tại<br />vui lòng thử đăng ký bằng email khác !</p>);
    } else {
        return <CircularProgress color="inherit" />;
    }
}

export default function SignUp() {

    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [open, setOpen] = useState(false);
    const [messageResponse, setmessageResponse] = useState("");
    const [disabled,setDisabled] = useState(true);
    


    const handleClose = () => {
        setOpen(false);
    };

    const returnSignInPage = () => {
        history.push("/SignIn");
    }

    useEffect(() => {
        if (passwordConfirm === password && password.length > 8 && checkEmailSignUp(email)) {
            setDisabled(false);
        }else {
            setDisabled(true);
        }
    },[password,passwordConfirm,email]);
    
    //check email
    const checkEmailSignUp = (email) => {
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        return pattern.test(email);
    }

    const onClickSignUp = () => {
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

        fetch("http://localhost:5000/user/SignUp", header)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setmessageResponse(data.message);
            })
            .catch(err => {
                console.error(err);
            });

    }

    //on change email 
    const onEmailChange = (event) => {
        setEmail(event.target.value);

    }

    //onchange password
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    //onChange password confirm
    const onPasswordConf = (event) => {
        setPasswordConfirm(event.target.value);
    } 

    return (
        <>
            <div className="full-screen">
                <div className="goHome">
                    <a href="/">LONELY CAT</a>
                </div>
                <div className="SignIn">
                    <h1> Đăng Ký Hội Viên</h1>
                    <div className="SignIn-form">
                        <form method="post" >
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" id="email" value={email} onChange={onEmailChange} ></input>
                            <label htmlFor="password" className="label">Mật khẩu</label>
                            <input type="password" id="password" value={password} onChange={onPasswordChange} ></input>
                            <label htmlFor="confirmPassword" className="label"> Nhập lại mật khẩu</label>
                            <input type="password" id="confirmPassword" value={passwordConfirm} onChange={onPasswordConf}></input>
                            <br />
                            <button type="button" onClick={onClickSignUp} disabled={disabled} className='btn btn-signin'>Đăng ký</button>
                        </form>
                        <p >
                            Bạn là hội viên?
                            <a href="/SignIn"><span className="a-dangky"> Đăng nhập ngay!</span></a>
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
                <DialogTitle>{"Đang tiến hành tạo tài khoản "}</DialogTitle>
                <DialogContent>

                    <div className="load">
                        {changeElement(messageResponse)}
                    </div>

                </DialogContent>
                <DialogActions>
                        {messageResponse === "successful" ?
                        <Button onClick={returnSignInPage} color="inherit">Trở lại đăng nhập</Button>
                        :
                        <Button onClick={handleClose} color="inherit">Trở lại</Button>
                        }
                </DialogActions>
            </Dialog>
        </>
    );
}
