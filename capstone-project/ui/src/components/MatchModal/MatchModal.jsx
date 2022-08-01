import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import "./MatchModal.css"


export default function MatchModal({matches, confirmUsername}){
    console.log("username:", confirmUsername)

   var UserInfo =  matches.filter( match => match.username == confirmUsername );
   console.log(matches)
   console.log("userInfo:", UserInfo)
return(
<div className = "Match-Modal">

<h1>Email: {UserInfo.email} </h1>

</div>
)
}