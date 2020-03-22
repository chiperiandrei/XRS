import React,{useState} from "react";
import '../assets/css/Header.css'
import {Link} from "react-router-dom";
import Modal from "./Modal";
const Header = props => {
    const handleModalSignIn = ()=>{
        return <Modal>Exemplu</Modal>
    }
    return <div className="header">
        <div className="header-left">
            <Link to='/' style={{color: 'dodgerblue', fontSize:'30px', fontFamily: 'Squada One, cursive'}}>{props.companyname} Reserve System</Link>
            <img src={require('../assets/img/logo.png')} alt='Logo Img' id='logo'/>
        </div>

        <div className="header-right">
            <Link to='/' className='active'>Home</Link>
            <Link to='/createAccount' >Create Account</Link>
            <Link to='/contact' >Contact</Link>
            <Link to='/about' >About</Link>
        </div>
    </div>
};
export default Header;