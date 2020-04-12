import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductAddComponent from '../../components/ProductAdd'
const ProductAdd = props => {
    return [<Header companyname={localStorage.getItem("exists") === "true" ? localStorage.getItem("companyName") : "X"} />,
    <ProductAddComponent />,
    <Footer datecreated={localStorage.getItem("exists") === "true" ? localStorage.getItem("year") : "2020"} authorname={localStorage.getItem("exists") === "true" ? localStorage.getItem("author_name") : "Andrei Chiperi"} />]
};
export default ProductAdd;
