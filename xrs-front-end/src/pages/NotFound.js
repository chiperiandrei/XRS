import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";

const NotFound = props => {

    if (localStorage.getItem("exists") === "true") {
        return [<Header companyname={localStorage.getItem("companyName")} />, <div><b id="text">Oups... This page doesn't not exists...</b><img src={require('../assets/img/404.png')} alt="Not found" id="notfound" /></div>
            , <Footer datecreated={localStorage.getItem("year")} authorname={localStorage.getItem("author_name")} />]
    }
    else {
        return [<Header companyname="X" />, <div><b id="text">Oups... This page doesn't not exists...</b><img src={require('../assets/img/404.png')} alt="Not found" id="notfound" /></div>
            , <Footer datecreated='2020' authorname='Andrei Chiperi' />]
    }

};
export default NotFound;
