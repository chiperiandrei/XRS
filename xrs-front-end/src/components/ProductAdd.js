import React, { useState, Fragment, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import Axios from "axios";



//Notification section
import { ToastContainer, ToastType } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProductAdd = props => {
    const [inputValues, setInputValues] = useState([
        { property: '', value: '' }
    ])
    const [productName, setProductname] = useState('');
    const [category, setCategory] = useState(null);
    const [incomingid, setIncomingid] = useState('');
    const token = localStorage.getItem("user_info");
    const [uploadData, setUpload] = useState(null);  

    const handleImageChange = e => {

        const temp = new FormData();
        var files = e.target.files;
        for (const key of Object.keys(files)) {
            temp.append('imgCollection', files[key])
        }
        if(uploadData == null){
            setUpload(temp);
        }
        else {
            for (var pair of uploadData.entries()) {
                temp.append(pair[0], pair[1]);
            }
            setUpload(temp);
        }
    }



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
    }
    const handleSubmit = e => {
        e.preventDefault();
        var convertedObject = {};
        for (var i = 0; i < inputValues.length; i++) {
            convertedObject[inputValues[i].property] = inputValues[i].value;
        }
        const data = {
            name: productName,
            specs: convertedObject,
            category: category.value
        }
        Axios.post('http://localhost:4001/api/products/', data, {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        }).then(res => {

            for (var value of uploadData.values()) {
                console.log(value); 
             }

            Axios.post(`http://localhost:4001/api/products/upload/${res.data.product}`, uploadData, {
                headers: {
                    "auth-token": token.substr(1, token.length - 2),
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    toast.success("Files uploaded successfully!")
                })
                .catch(err => toast.error(err.response.data))
        })
            .catch(err => toast.error(err.response.data))
    }
    const options = [
        { value: 'IT', label: 'IT' },
        { value: 'CONSTRUCTII', label: 'CONSTRUCTII' },
        { value: 'CONSTRUCTII2', label: 'CONSTRUCTII2' }
    ]
    return <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ToastContainer autoClose={2000} />
        <div id="main-info">
            <span>Name</span>
            <input
                type="text"
                id="name"
                name="name"
                value={productName}
                onChange={event => handleName(event)}
            />
            <span>Images</span>
            <input
                type="file"
                id="img"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            <span>Category</span>
            <CreatableSelect
                isClearable
                options={options}
                onChange={(e) => {
                    setCategory(e)
                }}
                placeholder='Search for a category...'
                styles={customStyles}
                width='5%'
            />
        </div>
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
            >
                Save
            </button>
        </div>
    </form >
};

//Styles

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue'
    }),
    control: () => ({
        width: 200,
        display: 'flex'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}

export default ProductAdd;