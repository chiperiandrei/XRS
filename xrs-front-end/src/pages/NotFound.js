import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";

const NotFound = props => {
    return [<Header companyname="X"/>,
        <div><b id="text">Oups... This page doesn't not exists...</b><img src={require('../assets/img/404.png')} alt="Not found" id="notfound"/></div>,
        <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
};
export default NotFound;
