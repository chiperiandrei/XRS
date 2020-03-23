import React from "react";
import {ContainerProduct,PriceProduct,ContainerButton,} from '../assets/styles/Product'

const Product = props => {
    console.log(props.infos)
    return <ContainerProduct><img src={require('../assets/img/logo.png')} alt='example of product' width="100%"/><h1>{props.infos.name}</h1><PriceProduct>{props.infos.avalaible}</PriceProduct><ContainerButton>Reserve</ContainerButton></ContainerProduct>
};
export default Product;