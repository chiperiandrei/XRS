import React,{useState} from "react";
import {Container,RegisterBTN} from '../assets/styles/Register';
import { useHistory } from "react-router-dom";
const Login = props =>{
    let history = useHistory();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const handlerEmailInput = e=>{
        setEmail(e.target.value)
    }
    const handlerPasswordInput = e=>{
        
        setPassword(e.target.value)
    }
    const logInHandler =e =>{
        e.preventDefault();
        console.log('starting login')
        console.log(password)
        console.log(email)
        console.log(process.env.API_SIGNUP)
        if(password==='stay')
            history.push('/');
    }
    const loginforrm=   <Container>
                                <h1>Login</h1>
                                <p>Please fill in this form to login.</p>
                                <label for="email"><b>Email</b></label>
                                <input type="email" onChange={handlerEmailInput} placeholder="Enter Email" name="email" required/>
                                <label for="psw"><b>Password</b></label>
                                <input type="password" onChange={handlerPasswordInput} placeholder="Password" name="psw" required />
                                <RegisterBTN type='submit' onClick={logInHandler}>Login</RegisterBTN>
                            </Container>;
  return loginforrm;
};
export default Login;