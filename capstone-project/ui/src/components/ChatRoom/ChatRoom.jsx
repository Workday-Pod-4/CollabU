import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import Video from 'twilio-video';
import axios from "axios";
import "./ChatRoom.css";

export default function ChatRoom() {

    const { user, chatOpen, setChatOpen} = useAuthContext()

    const [room, setRoom] = React.useState(null);
    const [showRoom, setShowRoom] = React.useState(false);
    const [localParticipant, setLocalParticipant] = React.useState(null);
    const [remoteParticipant, setRemoteParticipant] = React.useState(null);

    var cName="";
    var bName="";

    let roomID = 'test'

    if (chatOpen == false) {
        cName="chat-container closed";
        bName="chat closed";
    }
    else {
        cName="chat-container open";
        bName="chat open";
    }

    // set the remote participant when they join the room
    const participantConnected = participant => {
      setRemoteParticipant(participant)
    };

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
            <Room handleOnClick={handleOnClick} showRoom={showRoom} room={room} localParticipant={localParticipant} remoteParticipant={remoteParticipant}/>
        </div>
    </div>     
    )}


export function Room(props) {

    const [muteAudio, setMuteAudio] = React.useState(true);

    function toggleMuteAudio () {
        setMuteAudio(!muteAudio)
      }

      

    return (
        <div className="user-views">
            {props.showRoom && props.localParticipant !== null ?
            <div>
                <div className="participant-video">
                {props.remoteParticipant !== null ? <Participant key={props.remoteParticipant.sid} participant={props.remoteParticipant} muteAudio={muteAudio}/>: null}
                    <Participant key={props.localParticipant.sid} participant={props.localParticipant} room={props.room} muteAudio={muteAudio}/>
                </div>
                    <div className="bottom-row">
                        <div className="button-container">
                            <button className="mute" onClick={toggleMuteAudio}>Mute</button>
                            <button className="video">Video</button>
                        </div>
                        <div className="">
                            <button className="">Chat</button>
                        </div>
                    </div> 
            </div>
            : <div className="enter-room"><button onClick={props.handleOnClick}> Enter Room </button>
              <p>Please make sure no other application is using your camera or microphone</p>
              <p>When ready, press the Enter Room button to meet your match</p>
            </div>}  
        </div>
    )
}

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
            <h3>{props.participant.identity}</h3>
            <div className="user-video">
                <video ref={videoRef} autoPlay={true} />
            </div>
            <audio ref={audioRef} autoPlay={true} muted={props.muteAudio} />
        </div>
)}