import React, { useLayoutEffect, useState } from "react";
import "./style.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DialogContentText from '@mui/material/DialogContentText';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoadingPage(props) {

    const [open, setOpen] = useState(Boolean);

    const goBackHome = () => {
        window.location.reload();
    }

    useLayoutEffect(() => {
        if (props.errorToken) {
            setOpen(true);
            localStorage.removeItem('accessToken');
        }
    }, [props.errorToken]);

    return (
        <>
            <div style={{ backgroundColor: "#1c1e21",width:"100%",height:"100vh" }}>
                <div id="loader" ></div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đã xảy ra lỗi"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Đã xảy ra lỗi bạn bị đăng xuất khỏi LONELY CAT,
                        bạn có thể phản hồi qua Gmail : longlc956@gmail.com
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={goBackHome} color="inherit">Trở lại trang chủ</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}