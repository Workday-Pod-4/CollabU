import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./ChatRoom.css";



export default function ChatRoom() {

    const { chatOpen, setChatOpen} = useAuthContext()

    var cName="";
    var bName="";

    if(chatOpen == false){
        cName="chat-container closed";
        bName="chat closed";
    }
    else{
        cName="chat-container open";
        bName="chat open";
    }
    
    return (
    <div className = "chat-room">
        
            { chatOpen? 
            <div className="content open">
                <div className="user-views open">
                    <div className="user-view">
                        <h1>Name</h1>
                        <div className="user-video">
                        <h1>User 2 Video</h1>
                        </div>
                    </div>
                    <div className="bottom-row open">
                        <div className="button-container">
                            <button className="mute">Mute</button>
                            <button className="video">Video</button>
                        </div>
                    </div>
                </div>
                <div className={cName}>
                    <button className={bName} onClick={() => (setChatOpen(!chatOpen))}>Chat</button>
                    <div className="chat-logs">
                        <div className="input-field">
                            <input name="chat" className="chat-input" placeholder="Type something..."></input>
                        </div>
                        <div className="messages">
                            <span>Test</span>
                        </div>
                    </div>
                </div>
            </div>
            :
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
                        <button className={bName} onClick={() => (setChatOpen(!chatOpen))}>Chat</button>
                    </div>
                </div>
            </div>
            }
    </div>    
    )}
