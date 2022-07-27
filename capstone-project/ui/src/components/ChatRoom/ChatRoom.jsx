import * as React from "react";
import { Link } from "react-router-dom";
import Video from 'twilio-video';
import { useParams } from "react-router-dom"
import axios from "axios";
import { useAuthContext } from "../../contexts/auth";
import "./ChatRoom.css";

export default function ChatRoom() {

    const { user } = useAuthContext();

    const [room, setRoom] = React.useState(null);
    const [showRoom, setShowRoom] = React.useState(false);
    const [localParticipant, setLocalParticipant] = React.useState(null);
    const [remoteParticipant, setRemoteParticipant] = React.useState(null);

    let roomID = 'test'

    const participantConnected = participant => {
      setRemoteParticipant(participant)
    };

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
        <Room handleOnClick={handleOnClick} showRoom={showRoom} room={room} localParticipant={localParticipant} remoteParticipant={remoteParticipant}/>
    </div>    
)}

export function Room(props) {

    return (
      <div className="lobby">
        {props.showRoom && props.localParticipant !== null ? <Participant key={props.localParticipant.sid} participant={props.localParticipant} room={props.room}/> : <button onClick={props.handleOnClick}> Enter Room </button>}
        {props.remoteParticipant !== null ? <Participant key={props.remoteParticipant.sid} participant={props.remoteParticipant}/>: ''}
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
    <div className="participant">
      <p>I'm in the room</p>
      <h3>{props.participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
      <button> Exit Room </button>
    </div>
  )
}