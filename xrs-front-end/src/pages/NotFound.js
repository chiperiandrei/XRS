import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const NotFound = props => {

    const company_info = useSelector(state => state.company_info)


    return [<Header companyname={company_info !== null ? company_info.company_name : "X"} />,
    <div><b id="text">Oups... This page doesn't not exists...</b><img src={require('../assets/img/404.png')} alt="Not found" id="notfound" /></div>,
    <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />]


};
export default NotFound;
