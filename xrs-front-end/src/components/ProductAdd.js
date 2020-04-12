import React, { useState, Fragment } from "react";
import { Container } from '@material-ui/core';
import { Property } from '../assets/styles/ProductAdd'


const ProductAdd = props => {
    const [inputValues, setInputValues] = useState([
        { property: '', value: '' }
    ])
    const [productName, setProductname] = useState('');

    const handleAddSpec = () => {
        const values = [...inputValues];
        values.push({ property: '', value: '' })
        setInputValues(values)
    }
    const handleRemoveSpec = index => {
        const values = [...inputValues];
        values.splice(index, 1);
        setInputValues(values);
    }
    const handleInputChange = (index, event) => {
        const values = [...inputValues];
        if (event.target.name === "property") {
            values[index].property = event.target.value;
        }
        else {
            values[index].value = event.target.value;
        }
        setInputValues(values);
    }
    const handleName = e => {
        setProductname(e.target.value)
        console.log(productName)
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log({ list: inputValues, productName: productName });
    }
    return <Container>
        <h1>Add a product</h1>
        <form onSubmit={handleSubmit}>
            <div id="name">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={productName}
                    onChange={event => handleName(event)}
                />
            </div>
            <div>
                {inputValues.map((inputValue, index) => (
                    <Fragment key={`${inputValue}~${index}`}>
                        <Property>
                            <label htmlFor="property">Property</label>
                            <input
                                type="text"
                                className="form-control"
                                id="property"
                                name="property"
                                value={inputValue.property}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <label htmlFor="value">Value</label>
                            <input
                                type="text"
                                className="form-control"
                                id="value"
                                name="value"
                                value={inputValue.value}
                                onChange={event => handleInputChange(index, event)}
                            />
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleRemoveSpec(index)}
                            >
                                Remove this property
                            </button>

                        </Property>
                    </Fragment>
                ))}
            </div>
            <button
                className="btn btn-link"
                type="button"
                onClick={() => handleAddSpec()}
            >
                Add new property
                        </button>
            <div>
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    Save
                </button>
            </div>
        </form >

    </Container>
};
export default ProductAdd;