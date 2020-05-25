import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from '../components/Login';



const Login = props => {

    const company_info = useSelector(state => state.company_info)

    return [<Header companyname={company_info !== null ? company_info.company_name : "X"} />,
    <LoginForm />,
    <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />]

};
export default Login;
