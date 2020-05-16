import React, { useState } from "react";
import { Container, RegisterBTN } from '../assets/styles/Register';
import axios from 'axios';
import { useHistory } from "react-router-dom";


//Notification section
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Register = props => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');

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
    const handleAfterSubmit = () => {
        history.push("/login")
    }
    const signUpHandler = e => {

        axios.post('https://xrs-users-management.herokuapp.com/api/ums/register', {
            firstname: fname,
            lastname: lname,
            email: email,
            password: password
        }).then(response => {
            toast.success("Account successfully created!")
            // eslint-disable-next-line
            const lets_go = setTimeout(handleAfterSubmit, 2000);
        })
            .catch(err => {
                if (err.response !== undefined) {
                    if (err.response.data.errors !== undefined) {
                        const errors = err.response.data.errors;
                        const errorMessages = [
                            errors.firstname.message,
                            errors.lastname.message,
                            errors.email.message
                        ]
                        errorMessages.forEach(element => {
                            toast.error(element)
                        });
                    }
                    else
                        err.response.data.message !== undefined ? toast.error(err.response.data.message) : toast.error(err.response.data)
                }
            });



    };
    const registerform = <Container>
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" onChange={handlerEmailInput} placeholder="Enter Email" name="email" required />
        <label htmlFor="fname"><b>First name</b></label>
        <input type="text" onChange={handlerFnameInput} placeholder="First Name" name="fname" required />
        <label htmlFor="lname"><b>Last name</b></label>
        <input type="text" onChange={handlerLnameInput} placeholder="Last Name" name="lname" required />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" onChange={handlerPasswordInput} placeholder="Password" name="psw" required />
        <RegisterBTN type='submit' onClick={signUpHandler}>Register</RegisterBTN>
        <ToastContainer autoClose={2000} />

    </Container>;
    return registerform;
};
export default Register;
