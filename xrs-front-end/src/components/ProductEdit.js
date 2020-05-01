import React, { useEffect, useState } from "react";
import Axios from 'axios';
import MaterialTable from 'material-table';



//Notification section
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const ProductEdit = props => {
    const token = localStorage.getItem("user_info");
    const [changed, setChanged] = useState(true);
    const [all, setAll] = useState(0)

    let allProducts = query =>
        new Promise((resolve, reject) => {
            Axios.get('http://localhost:4001/api/products/', {
                headers: {
                    "auth-token": token.substr(1, token.length - 2)
                }
            })
                .then(function (response) {
                    let products = []
                    products = response.data.map(product => {
                        return {
                            name: product.name,
                            category: product.category,
                            dateadded: product.added,
                            id: product._id
                        }
                    }
                    )
                    setAll(products.length)
                    resolve({
                        data: products,
                        page: 0,
                        totalCount: products.length,
                    })
                })
                .catch(function (error) {
                    // handle error
                    toast.error(error.response.data)

                })
        })

    useEffect(() => {
        console.log(changed)
    }, [changed])

    return <div>
        <MaterialTable
            title="Edit products"
            columns={[
                {
                    title: 'Image', field: 'image', render: rowData => (
                        <img
                            style={{ height: 36, borderRadius: '50%' }}
                            src='https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'
                        />
                    )
                },
                { title: 'Name', field: 'name' },
                { title: 'Category', field: 'category' },
                { title: 'Date added', field: 'dateadded', editable: 'never' },
                { title: 'id', field: 'id', hidden: true },
            ]}
            data={allProducts}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                Axios.put(`http://localhost:4001/api/products/${oldData.id}`, newData, {
                                    headers: {
                                        "auth-token": token.substr(1, token.length - 2)
                                    }
                                })
                                    .then(response => {
                                        setChanged(!changed)
                                        toast.success(response.data.message)
                                    })
                                    .catch(err => toast.error(err.response.data)
                                    )

                            }
                            resolve()
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                Axios.delete(`http://localhost:4001/api/products/${oldData.id}`, {
                                    headers: {
                                        "auth-token": token.substr(1, token.length - 2)
                                    }
                                })
                                    .then(response => {
                                        setChanged(!changed)
                                        toast.success(response.data.message)
                                    })
                                    .catch(err => toast.error(err.response.data)
                                    )
                            }
                            resolve()
                        }, 1000)
                    }),
            }}
            options={
                {
                    search: true
                },
                {
                    pageSizeOptions: all > 20 ? [5, 10, 20, all] : [5, 10, 20]
                }
            }
        />

        <ToastContainer autoClose={2000} />

    </div>

};
export default ProductEdit;