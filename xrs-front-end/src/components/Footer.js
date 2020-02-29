import React from "react";
import '../assets/css/Footer.css';
const Footer = props => {
    return     <footer>
        <p>Created at {props.datecreated}  by  {props.authorname}</p>
    </footer>
};


export default Footer;
