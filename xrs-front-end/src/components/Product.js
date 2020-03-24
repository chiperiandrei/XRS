import React from "react";
import {ContainerProduct,PriceProduct,ContainerButtonNotAvalaible,ContainerButtonAvalaible,ImgProduct,ReservedDate} from '../assets/styles/Product'

const Product = props => {
    console.log(props.infos)
    const specs = props.infos.specs.map(specname => <li>{specname[0]} : {specname[1]}</li>)
    if(props.infos.avalaible===true)
        return <ContainerProduct><ImgProduct src={require('../assets/img/cablu_retea.jpg')} alt='example of product'></ImgProduct><h1>{props.infos.name}</h1><PriceProduct>Status: Avalaible</PriceProduct><ul>{specs}</ul><ContainerButtonAvalaible>Reserve</ContainerButtonAvalaible></ContainerProduct>
    else  return <ContainerProduct><ImgProduct src={require('../assets/img/monitor.jpg')} alt='example of product'></ImgProduct><h1>{props.infos.name}</h1><PriceProduct>Status: Reserved</PriceProduct><ReservedDate>Reserved untiil: {props.infos.date_until_reserved}</ReservedDate><ul>{specs}</ul><ContainerButtonNotAvalaible disabled>Reserved</ContainerButtonNotAvalaible></ContainerProduct>
         
};
export default Product;