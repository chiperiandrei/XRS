import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
const ProductRemove = props => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        Axios.get('https://jsonblob.com/api/jsonBlob/40718766-70f2-11ea-8c90-2169dd3bcb9b')
            .then(function (response) {
                // handle success
                setLoading(false);

                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])
    if (loading === true) {
        return <div>
            <h1>
                We're loading the products
                    </h1>
            <CircularProgress color={'inherit'} size={300} />
        </div>
    }
    else {
        return <div>
            <h1>
                We're done
                </h1>
        </div>
    }
};
export default ProductRemove;