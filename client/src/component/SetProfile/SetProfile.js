import React, { useLayoutEffect, useState } from "react";
import "./style.css";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FormSetProfile from "./FormSetProfile";

const step = [
    {
        label: 'Cập nhập thông tin',
        content: true
    }, {
        label: 'Cập nhập thông tin',
        content: '2'
    }, {
        label: 'Cập nhập thông tin',
        content: '3'
    }
]


export default function SetProfile() {
   
    const [stepNumber, setStepNumber] = useState(0);
    const FirstStep = stepNumber === 0 ? true : false;
    const lastStep = stepNumber === step.length - 1 ? true : false;
    const [display, setdisplay] = useState("none");
    const [name, setName] = useState("");
    const [phone,setPhone] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    }

    useLayoutEffect(() => {
        if (stepNumber === 2) {
            setdisplay("inline-block");
        } else {
            setdisplay("none");
        }
    }, [stepNumber])


    const onClickNext = () => {
        setStepNumber((prevStep) => {
            return prevStep + 1;
        })
    }

    const onClickBack = () => {
        setStepNumber((prevStep) => {
            return prevStep - 1;
        })
    }

    const onClickFinish = () => {
         //token 
         var header = {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        }

        //hearder
        var reqOptions = {
            method: "POST",
            headers: header,
            body : JSON.stringify({
                name:name,
                phone:phone
            })
        }

        fetch("http://localhost:5000/user/changeInfoUser", reqOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.message);
                if (data.message === "successful") {
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error("error fetch");
            })
    }

    return (
        <div className="setProfile">
            <div className="domain-profile-setting">
                <div className="header-profile-setting-div">
                    <span className="header-profile-setting-p">
                        {step[stepNumber].label}
                    </span>
                </div>
                <div className="content-profile-setting-div">
                    {step[stepNumber].content === true ?  <FormSetProfile valueName={name} changeName={handleChangeName} valuePhone={phone} changePhone={handleChangePhone} /> 
                    : step[stepNumber].content}
                </div>
                <div className="footer-profile-setting-div">
                    <div>
                        <button className="footer-profile-setting-btn" onClick={onClickBack} disabled={FirstStep}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <KeyboardArrowLeft />
                                </div>
                                <div style={{ height: "24px", lineHeight: "24px" }}>
                                    BACK
                                </div>
                            </div>
                        </button>
                    </div>
                    <div>
                        <button className="footer-profile-setting-btn" style={{ height: 47 }} onClick={onClickNext} disabled={lastStep}>
                            <div style={{ display: "flex" }}>
                                <div style={{ height: "24px", lineHeight: "24px" }}>
                                    NEXT
                                </div>
                                <div>
                                    <KeyboardArrowRight />
                                </div>
                            </div>
                        </button>
                        <button className="footer-profile-setting-btn" onClick={onClickFinish} style={{ marginLeft: 0, display: display }}>
                            FINISH
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}