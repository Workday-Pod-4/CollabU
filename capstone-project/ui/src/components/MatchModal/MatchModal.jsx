import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import "./MatchModal.css"


export default function MatchModal({matches,Match, toggleMatchModal}){
    const {matchModal, setMatchModal} = useAuthContext();
    
    React.useEffect(() => {
      // filtering matches array to include only object where username is equal to username in Onclick event
      var UserInfo =  matches.filter( match => match.username == Match );
      // console.log("matchModal:", matchModal)
      // console.log("confirmUsername:", Match)
      // console.log("userInfo:", UserInfo)
      // console.log("matches:", matches)
    }, [Match]);
  
  
   


return(
    <div className="match-modal-container">
    <div className="match-modal">
      <div className="match-modal-header">
        <img className = "match-modal-img"></img>
        <h1>Hello</h1>
      </div>
      <li className="close-match-modal" onClick={toggleMatchModal}>
        x
      </li>

    </div>
    </div>


)
}