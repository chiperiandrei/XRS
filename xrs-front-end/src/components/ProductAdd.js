import React, { useState, Fragment } from "react";


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
    return <form onSubmit={handleSubmit}>

        <span>Name</span>
        <input
            type="text"
            id="name"
            name="name"
            value={productName}
            onChange={event => handleName(event)}
        />
        <div>
            {inputValues.map((inputValue, index) => (
                <Fragment key={`${inputValue}~${index}`}>
                    <div id="property">
                        <span>Property</span>
                        <input
                            type="text"
                            id="property"
                            name="property"
                            value={inputValue.property}
                            onChange={event => handleInputChange(index, event)}
                        />
                        <span>Value</span>
                        <input
                            type="text"
                            id="value"
                            name="value"
                            value={inputValue.value}
                            onChange={event => handleInputChange(index, event)}
                        />
                        <button
                            type="button"
                            id="remove"
                            onClick={() => handleRemoveSpec(index)} >
                            Remove this property
                        </button>

                    </div>
                </Fragment>
            ))}
        </div>
        <button
            type="button"
            id="add"
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
};
export default ProductAdd;