import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Video from 'twilio-video';
import axios from "axios";
import muteIcon from "../../assets/muted-svgrepo-com.svg"
import "./ChatRoom.css";

export default function ChatRoom() {

    const { user, 
            chatOpen, 
            setChatOpen, 
            inRoom, 
            setInRoom, 
            setExiting, 
            exiting,
            togglePrefModal,
            findingAnotherBuddy, 
            setFindingAnotherBuddy } = useAuthContext()

    const [room, setRoom] = React.useState(null);
    const [showRoom, setShowRoom] = React.useState(false);
    const [localParticipant, setLocalParticipant] = React.useState(null);
    const [remoteParticipant, setRemoteParticipant] = React.useState(null);

    const navigate = useNavigate();

    setInRoom(true);

    let roomID = useParams().id;
    
    /* Lets the local participant know that the remote participants has ended the session 
       and they have been kicked from the room */
    const participantDisconnected = () => {

        const elements = document.getElementsByClassName('user-view')[0]
        const participantIdentity = elements.getElementsByTagName('h3')[0]
        const remoteMuteImg= document.getElementsByClassName('mute-icon')[0]
        remoteMuteImg.style.visibility = "hidden";
        const localMuteImg= document.getElementsByClassName('mute-icon')[1]
        localMuteImg.style.visibility = "hidden";
        participantIdentity.textContent = 'Your match left and the room has ended. Please use the buttons above to leave the room.'

        if (room?.participants.size === 0) {
    
            const disconnectEveryoneFromRoom = async () => {
    
                // Complete the Room, disconnecting all RemoteParticipants
                try {
                    await axios({
                        method: 'post',
                        url: `http://localhost:3001/disconnect/${roomID}`
                    });
                } catch (error) {
                    console.error(error)
                }
            }
            disconnectEveryoneFromRoom()
        }};

    // set the remote participant when they join the room
    const participantConnected = participant => {
        setRemoteParticipant(participant)
        };

    if (room) {
        room.on('participantDisconnected', participantDisconnected);
    }

    /* Allows user to disconnect from the room and be shown a match modal as soon 
       they're redirected */
    const findAnotherBuddy = () => {
        async function disconnectFromRoomToFindBuddy() {

            // Disconnect the LocalParticipant.
            if (room) {
                room.disconnect()
                setInRoom(false);
                togglePrefModal();
                navigate('/profile')
            } else {
                setInRoom(false);
                togglePrefModal();
                navigate('/profile')
            } 
            }
        disconnectFromRoomToFindBuddy()
        }

    // disconnects the user from the room
    const exitRoom = () => {
        async function disconnectFromRoom() {

        // Disconnect the LocalParticipant.
        if (room) {
            room.disconnect()
            navigate('/profile')
        } else {
            navigate('/profile')
        }
      }
    
      disconnectFromRoom()
      setInRoom(false);
      }

    // Allows a user to a Twilio Room when they click on the Enter Room button
    const handleOnClick = () => {
      async function joinRoom() {

      // fetch an Access Token from the join-room route
      const response = await axios({
          method: 'post',
          url: 'http://localhost:3001/join-room',
          data: {
              identity: user.username,
              roomName: roomID
          }
      });

      const token = response.data.token;

      // connects user to a twilio room
      const room = await Video.connect(token, {
        room: roomID,
      });

      setRoom(room)
      room.on('participantConnected', participantConnected);
      room.participants.forEach(participantConnected);
      setLocalParticipant(room.localParticipant)
    }
    
    joinRoom()
    setShowRoom(true)
    }
  
    return (
        <div className = "chat-room">
        <div className="content">
            {exiting ?
            <div className="modal-container">
                <div className="modal-content">
                    <button className="close-modal" onClick={() => {setExiting(false)}}> x </button>
                        <p> Are you sure you wanna exit? </p>
                    <button className="exit-fr" onClick={exitRoom}>Get me outta here!</button>
                </div>
            </div>
            :
            null
            }
            {findingAnotherBuddy ?
            <div className="modal-container">
                <div className="modal-content">
                    <button className="close-modal" onClick={() => {setFindingAnotherBuddy(false)}}> x </button>
                        <p> Are you sure you wanna find another buddy </p>
                    <button className="exit-fr" onClick={findAnotherBuddy}>Yes this person sucks!</button>
                </div>
            </div>
            :
            null
            }
            <Room handleOnClick={handleOnClick} showRoom={showRoom} room={room} localParticipant={localParticipant} remoteParticipant={remoteParticipant} chatOpen={chatOpen} setChatOpen={setChatOpen} user={user} roomID={roomID}/>
        </div>
    </div>     
    )}

export function Room(props) {

    let cName="";
    let bName="";

    if (props.chatOpen == false) {
        cName="chat-container closed";
        bName="chat closed";
    }
    else if (props.chatOpen == true) {
        cName="chat-container open";
        bName="chat open";
    }

    const [playAudio, setPlayAudio] = React.useState(false);
    const [displayVideo, setDisplayVideo] = React.useState(false);

    const trackSubscribed = (track) => {

        const elements = document.getElementsByClassName('actual-user-video')[0]
        const muteimg= document.getElementsByClassName('mute-icon')[0]
        const noVideo = document.getElementsByClassName('no-video')[0]
        if (track.kind == 'video') {
            elements.style.visibility = "visible";
            noVideo.style.visibility = "hidden";
            
        } else if (track.kind == 'audio') {
            muteimg.style.visibility = "hidden";
            elements.appendChild(track.attach());
        }
      };
  
      const trackUnsubscribed = (track) => {

        const elements = document.getElementsByClassName('actual-user-video')[0]
        const muteimg= document.getElementsByClassName('mute-icon')[0]
        const noVideo = document.getElementsByClassName('no-video')[0]
        if (track.kind == 'video') {
            elements.style.visibility = "hidden";
            noVideo.style.visibility = "visible";
        } else if (track.kind == 'audio') {
            muteimg.style.visibility = "visible";
            track.detach().forEach(element => {
                element.remove();
              });
        }
      };

    React.useEffect(() => {

        props?.room?.participants.forEach(participant => {
          participant.on('trackSubscribed', trackSubscribed);
          participant.on('trackUnsubscribed', trackUnsubscribed);
          });
    });
  
    // Adds and Removes Video tracks from DOM if user press the toggle
    function toggleDisplayVideo () {
      if (displayVideo === true) {
        setDisplayVideo(false)
      } else if (displayVideo === false) {
        setDisplayVideo(true)
      }
      
        if (displayVideo === true) {
            Video.createLocalVideoTrack().then(localVideoTrack => {
                return props.room.localParticipant.publishTrack(localVideoTrack);
              }).then(publication => {
                const elements = document.getElementsByClassName('user-video')[1]
                const noVideo = document.getElementsByClassName('no-video')[1]
                elements.appendChild(publication.track.attach());
                noVideo.style.visibility = "hidden";
              });
        } else if (displayVideo === false) {
            const noVideo = document.getElementsByClassName('no-video')[1]
            noVideo.style.visibility = "visible";
            props.room.localParticipant.videoTracks.forEach(publication => {
                const attachedElements = publication.track.detach();
                publication.track.stop();
                publication.unpublish();
                attachedElements.forEach(element => element.remove());
              });
        }
    }

    // Adds and Removes Audio tracks from DOM if user press the toggle
    function toggleMuteAudio () {

        if (playAudio === true) {
          setPlayAudio(false)
        } else if (playAudio === false) {
          setPlayAudio(true)
        }
  
        if (playAudio === true) {
            Video.createLocalAudioTrack().then(localAudioTrack => {
                return props.room.localParticipant.publishTrack(localAudioTrack);
              }).then(publication => {
                const elements = document.getElementsByClassName('user-video')[1]
                const muteimg= document.getElementsByClassName('mute-icon')[1]
                muteimg.style.visibility = "hidden";
                elements.appendChild(publication.track.attach());
              });
        } else if (playAudio === false) {
                const muteimg= document.getElementsByClassName('mute-icon')[1]
                muteimg.style.visibility = "visible";
            props.room.localParticipant.audioTracks.forEach(publication => {
                const attachedElements = publication.track.detach();
                publication.track.stop();
                publication.unpublish();
                attachedElements.forEach(element => element.remove());
              });
        }
      }

    const client = React.useRef();

    React.useEffect(() => {

        const socket = io("http://localhost:3001")

        client.current = socket;

        socket.on("connect", () => {
            client.current.emit('joinRoom', props.roomID);
          });
    
        socket.on('chat message', function(msg) {
            let messages = document.getElementById('messages');
            let item = document.createElement('li');
            item.textContent = `${msg.peerUsername}: ${msg.chatMsg}`;

            messages.appendChild(item);
          });
    
        socket.on('disconnect', () => {
            socket.removeAllListeners();
         });
    
        return () => socket.disconnect();
    
      }, []);

      const handleOnSubmit = (event) => {
        event.preventDefault();
        let input = document.getElementById('input');
        
        if (input.value) {
            let info = {'chatMsg': input.value,
                    'peerUsername': props.user.username }
            client.current.emit('chat message', info);
            info = '';
            input.value = ''
          }
    }

    return (
        <>
        <div className="content">
            {props.showRoom && props.localParticipant !== null ?
            <>
            <div className="user-views">
                <div className="participant-video">
                {props.remoteParticipant !== null ? <Participant key={props.remoteParticipant.sid} participant={props.remoteParticipant} />: 
                    <div className="user-view">
                        <h3> Your Match is Coming! </h3>
                        <div className="user-video">
                            <p> If it takes a while for your match to enter the room, it's possible that
                                they left before entering the room. If that's the case, please exit the room 
                                and try to find another match.
                            </p>
                        </div>
                </div>}
                    <Participant key={props.localParticipant.sid} playAudio={playAudio} displayVideo={displayVideo} user={props.user} participant={props.localParticipant} room={props.room} />
                </div>
            </div>
            <div className="bottom-row">
                        <div className="button-container">
                            <button className="mute" onClick={toggleMuteAudio}>Mute</button>
                            <button className="video" onClick={toggleDisplayVideo}>Video</button>
                        </div>
                        { props.chatOpen ? 
                        <div className={cName}>
                            <form id="form" action="">
                                <input id="input" autoComplete="off" placeholder="Type something..."/><button onClick={handleOnSubmit}>Send</button>
                            </form>
                            <ul id="messages"></ul>
                            <button className="close-chat" onClick={() => (props.setChatOpen(!props.chatOpen))}>X</button>           
                        </div> : 
                        <div className={cName}>
                            <button className={bName} onClick={() => (props.setChatOpen(!props.chatOpen))}>Chat</button>
                        </div> }
            </div>
            </>
        : <div className="enter-room"><button onClick={props.handleOnClick}> Enter Room </button>
        <p>Please make sure no other application is using your camera or microphone</p>
        <p>When ready, press the Enter Room button to meet your match</p>
      </div>
      }
      </div>
    </>
)}

export function Participant(props) {

const [videoTracks, setVideoTracks] = React.useState([]);
const [audioTracks, setAudioTracks] = React.useState([]);

const videoRef = React.useRef();
const audioRef = React.useRef();

const trackpubsToTracks = trackMap => Array.from(trackMap.values())
.map(publication => publication.track)
.filter(track => track !== null);

React.useEffect(() => {

    const trackSubscribed = track => {
    if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
    } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
    }
    };

    const trackUnsubscribed = track => {
    if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
    } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
    }
    };

    setVideoTracks(trackpubsToTracks(props.participant.videoTracks));
    setAudioTracks(trackpubsToTracks(props.participant.audioTracks));

    props.participant.on('trackSubscribed', trackSubscribed);
    props.participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
    setVideoTracks([]);
    setAudioTracks([]);
    props.participant.removeAllListeners();
    };
}, [props.participant]);

React.useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
    videoTrack.attach(videoRef.current);
    return () => {
        videoTrack.detach();
    };
    }
}, [videoTracks]);

React.useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
    audioTrack.attach(audioRef.current);
    return () => {
        audioTrack.detach();
    };
    }
}, [audioTracks]);

return (
        <div className="user-view">
            <div className="user-header">
            <h3>{props.participant.identity}</h3>
            <img className="mute-icon" src={muteIcon} alt="Muted"></img>
            </div>
            <div className="user-video">
              <video class="actual-user-video" ref={videoRef} autoPlay={true} />  
              <audio ref={audioRef} autoPlay={true} />
              <img className="no-video" 
              src=
              "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" alt="no-video" /> 
            </div>
        </div>
)}
