import React from "react";
import { ContainerProduct, PriceProduct, ContainerButtonNotAvalaible, ContainerButtonAvalaible, ImgProduct, ReservedDate, Avalaible, Reserved } from '../assets/styles/Product'
const Product = props => {
    let specs = []
    for (const property in props.infos.specs) {
        specs.push(<li>{property}: {props.infos.specs[property]}</li>)
    }
    if (props.reserved === "false")
        return <ContainerProduct><ImgProduct src={require('../assets/img/cablu_retea.jpg')} alt='example of product'></ImgProduct><h1>{props.infos.name}</h1><PriceProduct>Status:<Avalaible> Avalaible</Avalaible></PriceProduct><ul>{specs}</ul><ContainerButtonAvalaible>Reserve</ContainerButtonAvalaible></ContainerProduct>
    else {
        return <h1>s</h1>
    }
};
export default Product;