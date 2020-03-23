import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from '../components/Login';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            exists: false,
            company_name: '',
            created_by: '',
            email: ''
        }
        
    }

    componentDidMount() {
    }

    render() {

            return [<Header companyname="X"/>,<LoginForm/>
                , <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
        
    }
}

export default Login;
