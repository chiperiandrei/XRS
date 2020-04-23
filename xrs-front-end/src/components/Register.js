import React, { useState } from "react";
import { Container, RegisterBTN, Error } from '../assets/styles/Register';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Register = props => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const handlerEmailInput = e => {
        setEmail(e.target.value)
    };
    const handlerPasswordInput = e => {

        setPassword(e.target.value)
    };
    const handlerFnameInput = e => {

        setFName(e.target.value)
    };
    const handlerLnameInput = e => {

        setLName(e.target.value)
    };
    const signUpHandler = e => {

        axios.post('http://localhost:5000/api/ums/register', {
            firstname: fname,
            lastname: lname,
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            history.push("/login")
        })
            .catch(err => {
                if (err.response !== undefined) {
                    console.log(err.response)
                    if (err.response.data.errors !== undefined) {
                        const errors = err.response.data.errors;
                        const errorMessages = [
                            errors.firstname.message,
                            errors.lastname.message,
                            errors.email.message
                        ]
                        const errorsForShow = errorMessages.map(element => <li>{element}</li>)
                        setErrMessage(errorsForShow)
                    }
                    else
                        err.response.data.message !== undefined ? setErrMessage(err.response.data.message) : setErrMessage(err.response.data)
                }
            });



    };
    const registerform = <Container>
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <Error>{errMessage}</Error>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" onChange={handlerEmailInput} placeholder="Enter Email" name="email" required />
        <label htmlFor="fname"><b>First name</b></label>
        <input type="text" onChange={handlerFnameInput} placeholder="First Name" name="fname" required />
        <label htmlFor="lname"><b>Last name</b></label>
        <input type="text" onChange={handlerLnameInput} placeholder="Last Name" name="lname" required />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" onChange={handlerPasswordInput} placeholder="Password" name="psw" required />
        <RegisterBTN type='submit' onClick={signUpHandler}>Register</RegisterBTN>
    </Container>;
    return registerform;
};
export default Register;
