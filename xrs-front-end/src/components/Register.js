import React,{useState} from "react";
import {Container,RegisterBTN} from '../assets/styles/Register';
import axios from 'axios';
const Register = props =>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [fname, setFName]=useState('');
    const [lname, setLName]=useState('');
    const handlerEmailInput = e=>{
        setEmail(e.target.value)
    }
    const handlerPasswordInput = e=>{
        
        setPassword(e.target.value)
    }
    const handlerFnameInput = e=>{
        
        setFName(e.target.value)
    }
    const handlerLnameInput = e=>{
        
        setLName(e.target.value)
    }
    const signUpHandler =e =>{
        console.log('starting register')
        console.log(password)
        console.log(email)
        const name = `${fname} ${lname}`;
        console.log(name)
        console.log(process.env.API_SIGNUP)

        axios.post('https://xrs-back-end.herokuapp.com/api/ums/register',{name : name,email:email,password:password}).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const registerform=   <Container>
                                <h1>Register</h1>
                                <p>Please fill in this form to create an account.</p>
                                <label for="email"><b>Email</b></label>
                                <input type="email" onChange={handlerEmailInput} placeholder="Enter Email" name="email" required/>
                                <label for="fname"><b>First name</b></label>
                                <input type="text" onChange={handlerFnameInput} placeholder="First Name" name="fname" required/>
                                <label for="lname"><b>Last name</b></label>
                                <input type="text" onChange={handlerLnameInput} placeholder="Last Name" name="lname" required/>

                                <label for="psw"><b>Password</b></label>
                                <input type="password" onChange={handlerPasswordInput} placeholder="Password" name="psw" required />
                                <RegisterBTN type='submit' onClick={signUpHandler}>Register</RegisterBTN>
                            </Container>;
  return registerform;
};
export default Register;