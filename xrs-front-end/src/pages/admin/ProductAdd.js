import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductAddComponent from '../../components/ProductAdd'
const ProductAdd = props => {
    return [<Header companyname="X"/>,<ProductAddComponent/>,
        <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
};
export default ProductAdd;
