import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from '../components/Login';


const Login = props => {
    if (localStorage.getItem("exists") === "true") {
        return [<Header companyname={localStorage.getItem("companyName")} />, <LoginForm />
            , <Footer datecreated={localStorage.getItem("year")} authorname={localStorage.getItem("author_name")} />]
    }
    else {
        return [<Header companyname="X" />, <LoginForm />
            , <Footer datecreated='2020' authorname='Andrei Chiperi' />]
    }
};
export default Login;
