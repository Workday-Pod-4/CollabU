import * as React from "react";
import "./ContactCard.css";

export default function ContactCard() {
    
    return (
    <div className = "contact-card">
        <div className="content">
            <div className="form-wrapper">
                <ul className="info">
                    <li>
                        <span className="label">Email:</span>
                        <span className="email">totallyrealemail@example.com</span>
                    </li>
                    <li>    
                        <span className="label">Phone:</span>
                        <span className="phone">123-456-7890</span>    
                    </li>
                    <li>   
                        <span className="label">Address:</span>
                        <span className="address">123 Best Pod Street, Columbus, OH</span>   
                    </li>
                    <li>    
                        <span className="label">Socials:</span>
                        <div className="social-icons">
                            <a href="https://www.workday.com"><i className="fa fa-facebook-square"></i></a>
                            <a href="https://www.codepath.org"><i className="fa fa-instagram"></i></a>
                            <a href="https://www.youtube.com/watch?v=gU2HqP4NxUs"><i className="fa fa-linkedin-square"></i></a>
                            <a href="https://www.youtube.com/watch?v=uiIHpsNyea8"><i className="fa fa-twitter-square"></i></a>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><i className="fa fa-youtube-play"></i></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>    
    )}