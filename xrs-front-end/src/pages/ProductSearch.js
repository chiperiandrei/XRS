import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";
import Product from "../components/Product";
import {ContainerProducts} from '../assets/styles/ProductSearchPage';

const ProductSearch = props => {
    const data = {
        name : "Numele produsului",
        avalaible : "True",
        image_url : "../assets/img/logo.png"
    }
    const datano = {
        name : "Numele produsului1",
        avalaible : "False",
        image_url : "../assets/img/logo.png"
    }
    return [<Header companyname="X"/>,
        <ContainerProducts><Product infos={data}/><Product infos={datano}/><Product infos={data}/><Product infos={data}/><Product infos={datano}/><Product infos={datano}/><Product infos={data}/><Product infos={data}/><Product infos={data}/></ContainerProducts>,
        <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
};
export default ProductSearch;
