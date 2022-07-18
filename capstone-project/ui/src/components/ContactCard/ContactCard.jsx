import * as React from "react";
import { Link } from "react-router-dom";
import "./ContactCard.css";



export default function ContactCard({}) {
    return (
    <div className = "contact-card">
        <ul className = "info">
            <li>
            <span className = "label">Email:</span>
            <span></span>
            </li>
            <li>    
            <span className = "label">Phone:</span>
            <span></span>    
            </li>
            <li>   
            <span className = "label">Address:</span>
            <span></span>   
            </li>
            <li>    
            <span className = "label">Socials:</span>
            <span></span>    
            </li>





        </ul>
    </div>    
    )}