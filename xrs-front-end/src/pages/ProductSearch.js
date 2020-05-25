import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../assets/css/NotFound.css';
import { ContainerProducts } from '../assets/styles/ProductSearchPage';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Product from "../components/Product";

const ProductSearch = props => {
    const company_info = useSelector(state => state.company_info);
    const token = localStorage.getItem("user_info");
    const [select, setSelect] = useState('all');
    const [allProducts, setAllProducts] = useState(null);
    const userInfo = useSelector(state => state.user_information)
    const getAllproducts = () => {
        return Axios.get('http://localhost:4001/api/products', {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        })
    }
    const getReserved = () => {
        return Axios.get('https://xrs-borrow-management.herokuapp.com/api/borrows', {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        })
    }
    const info_reserved = () => {
        if (allProducts && allProducts.reserved) {
            allProducts.reserved.forEach((product) => {

                Axios.get('http://localhost:4001/api/products/' + product.product, {
                    headers: {
                        "auth-token": token.substr(1, token.length - 2)
                    }
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => console.log(err.response.data))
            })

        }
    }

    useEffect(() => {
        Axios.all([getAllproducts(), getReserved()])
            .then(response => {
                setAllProducts({ products: response[0].data, reserved: response[1].data })
            })
            .catch(err => console.log(err))


    }, [select])



    function removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        console.log(array)
    }
    return (
        <React.Fragment>
            <Header companyname={company_info !== null ? company_info.company_name : "X"} />
            <ContainerProducts>
                {allProducts && allProducts.reserved ? allProducts.reserved.forEach(element => {
                    allProducts.products.forEach(product => {
                        if (element.product === product._id) {
                            removeElement(allProducts.products, product)
                        }
                    });
                }) : null}
                {allProducts !== null && allProducts.products !== null ? allProducts.products.map(product => <Product infos={product} user={userInfo} />) : ''}
            </ContainerProducts>
            <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />
        </React.Fragment>
    )


};
export default ProductSearch;
