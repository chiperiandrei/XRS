import React from "react";
import '../assets/css/Footer.css';
const Footer = props => {
    return     <footer>
        <p>© {props.datecreated} {props.authorname}</p>
    </footer>
};


export default Footer;