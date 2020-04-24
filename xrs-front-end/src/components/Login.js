//React section
import React, { useState, useEffect } from "react";

//Style section
import { Container, RegisterBTN } from '../assets/styles/Register';


//Request section
import axios from 'axios';

//Redux section
import { useDispatch } from "react-redux";
import { logInUser } from "../actions/userActions";

// Browser events
import { useHistory } from "react-router-dom";

//Notification section
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const Login = props => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{

    },[email,password])
    const handlerEmailInput = e => {
        setEmail(e.target.value)

    }
    const handlerPasswordInput = e => {
        setPassword(e.target.value)
    }

    const handleErrorMessage = message => {
        toast.error(message)
    }
    const logInHandler = e => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        axios.post('http://localhost:5000/api/ums/login', data)
            .then(response => {
                console.log(response.data)
                dispatch(logInUser(response.data.token))
                history.push("/dashboard")
            })
            .catch(err => {
                handleErrorMessage(err.response.data);
                
            });
    }
    const loginforrm = <Container>
        <h1>Login</h1>
        <p>Please fill in this form to login.</p>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" onChange={handlerEmailInput} placeholder="Enter Email" name="email" required />
        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" onChange={handlerPasswordInput} placeholder="Password" name="psw" required />
        <RegisterBTN type='submit' onClick={logInHandler}>Login</RegisterBTN>
        <ToastContainer autoClose={2000} />
    </Container>;
    return loginforrm;
};
export default Login;