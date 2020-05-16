import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import '../assets/css/NotFound.css'
import Footer from "../components/Footer";
import Product from "../components/Product";
import { ContainerProducts } from '../assets/styles/ProductSearchPage';
import { useSelector } from "react-redux";
import Axios from "axios";

const ProductSearch = props => {
    const company_info = useSelector(state => state.company_info);
    const token = localStorage.getItem("user_info");
    const [select, setSelect] = useState('all');
    const [allProducts, setAllProducts] = useState(null);
    const getAllproducts = () => {
        return Axios.get('http://localhost:4001/api/products', {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        })
    }
    const getReserved = () => {
        return Axios.get('http://localhost:4002/api/borrows', {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        })
    }

    useEffect(() => {
        Axios.all([getAllproducts(), getReserved()])
            .then(response => {
                setAllProducts({ products: response[0].data, reserved: response[1].data })
            })
            .catch(err => console.log(err))
    }, [select])

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
    const handleSelect = e => {
        setSelect(e.target.value)
    }
    return (
        <React.Fragment>
            <Header companyname={company_info !== null ? company_info.company_name : "X"} />
            <ContainerProducts>
                {/* <select onChange={event => handleSelect(event)} defaultValue='all'>
                    <option value="all">All</option>
                    <option value="avalaible">Avalaible</option>
                    <option value="reserved">Reserved</option>
                </select>
                {/* <input id="search" placeholder={select}></input> */}


                {/* <Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} /><Product infos={data} /><Product infos={datano} />  */}
                {allProducts !== null && allProducts.products !== null ? allProducts.products.map(product => <Product infos={product} reserved="false" />) : ''}
            </ContainerProducts>
            <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />
        </React.Fragment>
    )


};
export default ProductSearch;
