import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";
import Product from "../components/Product";
import {ContainerProducts} from '../assets/styles/ProductSearchPage';

const ProductSearch = props => {
    const data = {
        name : "Cablu retea",
        specs : [
            ["Lungime ","30m"],
            ["An fabricatie",Date(Date.now()).toString()],
            ["Tip", "retea"]
        ],
        avalaible : true,
        image_url : '../assets/img/cablu_retea.jpg'
    }
    const datano = {
        name : "Monitor LOGITEQ",
        specs : [
            ["Frecventa ","144hz"],
            ["An fabricatie",Date(Date.now()).toString()],
            ["Tip", "monitor"],
            ["Firma", "HP de la hq"]
        ],
        avalaible : false,
        image_url : '../assets/img/monitor.jpg',
        date_until_reserved : Date(Date.now()).toString()
    }
    return [<Header companyname="X"/>,
        <ContainerProducts><Product infos={data}/><Product infos={datano}/></ContainerProducts>,
        <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
};
export default ProductSearch;
