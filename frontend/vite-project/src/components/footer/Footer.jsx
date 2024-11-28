import React from 'react';
import "./footer.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <footer>

    <div className="footer-content">
    
    <p>
    
    &copy; 2024 Your E-Learning Platform. All rights reserved. <br />
     Made with 💖 <a href="">Tom</a>

    
    </p> 
    
    <div className="social-links">
    
    <a href=""><AiFillFacebook /></a>
     <a href=""><AiFillTwitterSquare /></a>
    
     <a href=""><AiFillInstagram /></a>
    
    </div>
    
    </div>
    
    </footer>
  );
};

export default Footer;