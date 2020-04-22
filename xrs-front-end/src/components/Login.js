import React, { useState } from "react";
import { Container, RegisterBTN } from '../assets/styles/Register';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../actions/userActions";

const Login = props => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user_information)

    const handlerEmailInput = e => {
        setEmail(e.target.value)
    }
    const handlerPasswordInput = e => {

        setPassword(e.target.value)
    }

    const handleErrorMessage = message => {
        setEmail('');
        setPassword('');
        setErrorMessage(message)
    }
    const logInHandler = e => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        axios.post('http://localhost:5000/api/ums/login', data)
            .then(response => {
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
        <h1>{errorMessage}</h1>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" onChange={handlerEmailInput} placeholder="Enter Email" name="email" required />
        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" onChange={handlerPasswordInput} placeholder="Password" name="psw" required />
        <RegisterBTN type='submit' onClick={logInHandler}>Login</RegisterBTN>
    </Container>;
    return loginforrm;
};
export default Login;