import React from "react";
import {ContainerProduct,PriceProduct,ContainerButtonNotAvalaible,ContainerButtonAvalaible,ImgProduct,ReservedDate,Avalaible,Reserved} from '../assets/styles/Product'
const Product = props => {
    const specs = props.infos.specs.map(specname => <li>{specname["property"]} : {specname["value"]}</li>)
    if(props.infos.avalaible===true)
        return <ContainerProduct><ImgProduct src={require('../assets/img/cablu_retea.jpg')} alt='example of product'></ImgProduct><h1>{props.infos.name}</h1><PriceProduct>Status:<Avalaible> Avalaible</Avalaible></PriceProduct><ul>{specs}</ul><ContainerButtonAvalaible>Reserve</ContainerButtonAvalaible></ContainerProduct>
    else  return <ContainerProduct><ImgProduct src={require('../assets/img/monitor.jpg')} alt='example of product'></ImgProduct><h1>{props.infos.name}</h1><PriceProduct>Status: <Reserved>Reserved</Reserved></PriceProduct><ReservedDate>Reserved until: <span>{props.infos.date_until_reserved}</span></ReservedDate><ul>{specs}</ul><ContainerButtonNotAvalaible disabled>Reserved</ContainerButtonNotAvalaible></ContainerProduct>
         
};
export default Product;