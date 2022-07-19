import * as React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";

export default function ProfilePage(){
    const {user} = useAuthContext()


    React.useEffect(() => {
        console.log("userInfo:", user)

    }, [user])




return (

<h1>Profile</h1>





)
}