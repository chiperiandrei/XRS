import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";
import Product from "../components/Product";
import { ContainerProducts } from '../assets/styles/ProductSearchPage';

const ProductSearch = props => {
    const data = {
        name: "Cablu retea",
        specs: [
            { property: "Lungime ", value: "30m" },
            { property: "An fabricatie ", value: Date(Date.now()).toString() },
            { property: "Tip ", value: "retea" },
        ],
        avalaible: true,
        image_url: '../assets/img/cablu_retea.jpg'
    }
    const datano = {
        name: "Monitor LOGITEQ",
        specs: [
            { property: "Frecventa ", value: "144hz" },
            { property: "salut ", value: "plm" },

        ],
        avalaible: false,
        image_url: '../assets/img/monitor.jpg',
        date_until_reserved: Date(Date.now()).toString()
    }
    return (<React.Fragment>
        <Header companyname={localStorage.getItem("exists") === "true" ? localStorage.getItem("companyName") : "X"} />
        <ContainerProducts>
            <Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} />
        </ContainerProducts>
        <Footer datecreated={localStorage.getItem("exists") === "true" ? localStorage.getItem("year") : "2020"} authorname={localStorage.getItem("exists") === "true" ? localStorage.getItem("author_name") : "Andrei Chiperi"} /></React.Fragment>)
};
export default ProductSearch;
