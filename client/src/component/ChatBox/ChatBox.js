import React,{useEffect,useState} from "react";
import { RiLayoutRight2Fill } from "react-icons/ri";
import Item from "../Item/Item";


export default function ChatBox(props) {
    const [mess,setMess] = useState("");

    const handleonChangeChatBox = (event) => {
        setMess(event.target.value);
    }

    const scrollDown = () => {
        document.getElementById('scroll').scrollTop =  document.getElementById('scroll').scrollHeight;
    }
    const snedMessage = () => {
        if(mess === ""){
            console.log(("click"));
  
        }else{
            props.socket.current.emit("user-send-mess",{
                id:props.userFriend.id,
                name:props.userFriend.name,
                socketId:props.userFriend.socketId,
                message:mess
            });
            setMess("");
        }
    }

    useEffect(() => {
        scrollDown();
    },[])

    return (
        <div className="chatBox">
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <div className="headerChatBox">
                    <div className="infoChatBox">
                        <Item userName={props.userFriend.name} userAvatar="http://localhost:3000/img/avatar.jpg" onClick={() => { }} />
                        <div className="btn-dis-chatBox">
                            <button className="disabledChatBox" onClick={props.close}>X</button>
                        </div>
                    </div>
                    <div className="underlined"></div>
                </div>
                <div className="contentChatBox" id="scroll">
                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>

                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-left">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>

                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-left">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>

                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-left">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>

                    <div className="mess-margin">
                        <div className="inbox-right">
                            long ngu ngoc
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="mess-margin">
                        <div className="inbox-left">
                            asdasfaf
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="footerChatBox">
                    <div>
                        <input className="footerChatBox-input" placeholder="Aa" onChange={handleonChangeChatBox} value={mess}  />
                    </div>
                    <div>
                        <button className="btn-send" onClick={snedMessage} >SEND</button>
                    </div>
                </div>
            </div>
        </div>
    );

}