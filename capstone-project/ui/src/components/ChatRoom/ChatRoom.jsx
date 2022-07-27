import * as React from "react";
import { Link } from "react-router-dom";
import "./ChatRoom.css";



export default function ChatRoom() {

    let chatOpen = false;

    var cName="chat-container closed";
    var bName="chat button closed";


    function handleToggle(){
        chatOpen = !chatOpen;
        console.log("Is Chat open?",chatOpen);
    }


    React.useEffect(() => {
        /*if(chatOpen == false){
            cName="chat-container closed";
            bName="chat button closed";
        }
        else{
            cName="chat-container open";
            bName="chat button open";
        }*/
      }, [chatOpen, handleToggle])

    
    return (
    <div className = "chat-room">
        <div className="content">
            <div className="user-views">
                <div className="user-view">
                    <h1>Name</h1>
                    <div className="user-video">
                     <h1>User 1 Video</h1>
                    </div>
                </div>
                <div className="user-view">
                    <h1>Name</h1>
                    <div className="user-video">
                        <h1>User 2 Video</h1>
                    </div>
                </div>
            </div>
            <div className="bottom-row">
                <div className="button-container">
                    <button className="mute">Mute</button>
                    <button className="video">Video</button>
                </div>
                <div className={cName}>
                    <button className={bName} onClick={handleToggle}>Chat</button>
                </div>
            </div>
        </div>
    </div>    
    )}