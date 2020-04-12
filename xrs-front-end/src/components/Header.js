import React from "react";
import '../assets/css/Header.css'
import { Link } from "react-router-dom";
const Header = props => {
    const url = window.location.pathname;
    return <div className="header">
        <div className="header-left">
            <Link to='/' style={{ color: 'dodgerblue', fontSize: '30px', fontFamily: 'Squada One, cursive' }}>{props.companyname} Reserve System</Link>
            <img src={require('../assets/img/logo.png')} alt='Logo Img' id='logo' />
        </div>

        <div className="header-right">
            {url === '/' ? <Link to='/' className='active' >Home</Link> : <Link to='/' >Home</Link>}
            {url === '/createAccount' ? <Link to='/createAccount' className='active' >Create Account</Link> : <Link to='/createAccount' >Create Account</Link>}
            {url === '/login' ? <Link to='/login' className='active' >Login</Link> : <Link to='/login' >Login</Link>}
            {url === '/contact' ? <Link to='/contact' className='active' >Contact</Link> : <Link to='/contact' >Contact</Link>}
            {url === '/about' ? <Link to='/about' className='active' >About</Link> : <Link to='/about' >About</Link>}
            {url === '/productadd' ? <Link to='/productadd' className='active' >productadd</Link> : <Link to='/productadd' >productadd</Link>}
        </div>
    </div>
};
export default Header;