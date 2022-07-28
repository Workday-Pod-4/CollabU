import * as React from "react";
import "./ContactCard.css";

export default function ContactCard() {
    
    return (
    <div className = "contact-card">
        <div className="content">
            <div className="form-wrapper">
                <ul className = "info">
                    <li>
                        <span className = "label">Email:</span>
                        <span>totallyrealemail@example.com</span>
                    </li>
                    <li>    
                        <span className = "label">Phone:</span>
                        <span>123-456-7890</span>    
                    </li>
                    <li>   
                        <span className = "label">Address:</span>
                        <span>123 Best Pod Street, Columbus, OH</span>   
                    </li>
                    <li>    
                        <span className = "label">Socials:</span>
                        <span></span>    
                    </li>
                </ul>
            </div>
        </div>
    </div>    
    )}