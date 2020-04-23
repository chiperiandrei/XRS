import React from "react";
import '../assets/css/Header.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from '../actions/userActions';
import { isLogged } from '../utils';
const Header = props => {
    const url = window.location.pathname;
    const userData = useSelector(state => state.user_information);
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logOutUser());
    }


    if (userData !== null) {
        return <div className="header">
            <div className="header-left">
                {isLogged() ?
                    <Link to='/dashboard' style={{ color: 'dodgerblue', fontSize: '30px', fontFamily: 'Squada One, cursive' }}>{props.companyname} Reserve System</Link> :
                    <Link to='/dashboard' style={{ color: 'dodgerblue', fontSize: '30px', fontFamily: 'Squada One, cursive' }}>{props.companyname} Reserve System</Link>}
                <img src={require('../assets/img/logo.png')} alt='Logo Img' id='logo' />
            </div>

            <div className="header-right">
                {url === '/' ? <Link to='/' className='active' >Home</Link> : <Link to='/' >Home</Link>}
                {url === '/search' ? <Link to='/search' className='active' >Product Search</Link> : <Link to='/search' >Product Search</Link>}
                {userData.isOperator === true ? url === '/admin' ? <Link to='/admin' className='active' >Admin Panel</Link> : <Link to='/admin' >Admin Panel</Link> : null}
                {url === '/contact' ? <Link to='/contact' className='active' >Contact</Link> : <Link to='/contact' >Contact</Link>}
                {url === '/about' ? <Link to='/about' className='active' >About</Link> : <Link to='/about' >About</Link>}

                {<Link to='/' onClick={handleLogOut} >Logout</Link>}
            </div>
        </div>

    }
    else {
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
            </div>
        </div>
    }
};
export default Header;