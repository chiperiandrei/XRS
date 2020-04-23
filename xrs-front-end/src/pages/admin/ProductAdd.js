import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductAddComponent from '../../components/ProductAdd';
import { useSelector } from "react-redux";

const ProductAdd = props => {

    const company_info = useSelector(state => state.company_info)

    return [<Header companyname={company_info !== null ? company_info.company_name : "X"} />,
    <ProductAddComponent />,
    <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />]
};
export default ProductAdd;
