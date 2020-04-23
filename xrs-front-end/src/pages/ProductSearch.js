import React from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";
import Product from "../components/Product";
import { ContainerProducts } from '../assets/styles/ProductSearchPage';
import { useSelector } from "react-redux";

const ProductSearch = props => {
    const company_info = useSelector(state => state.company_info)

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
    return (
        <React.Fragment>
            <Header companyname={company_info !== null ? company_info.company_name : "X"} />
            <ContainerProducts>
                <Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} />
            </ContainerProducts>
            <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />
        </React.Fragment>
    )


};
export default ProductSearch;
