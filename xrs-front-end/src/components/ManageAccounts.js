import Axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
//Notification section
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





const ManageAccounts = props => {
    const token = localStorage.getItem("user_info");
    const [all, setAll] = useState(0)
    const handleMakeAdmin = (event, data) => {

        console.log(data)
        toast.success("Am apasat pe buton" + data.firstname)
    }


    let allUsers = query =>
        new Promise((resolve, reject) => {
            Axios.get('https://xrs-users-management.herokuapp.com/api/ums/users/', {
                headers: {
                    "auth-token": token.substr(1, token.length - 2)
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    let products = []
                    products = response.data.map(product => {
                        console.log(product)
                        const myDate = new Date(product.joined)
                        var displayDate = myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
                        return {
                            firstname: product.firstName,
                            lastname: product.lastName,
                            joined: displayDate,
                            nfc_id: product.nfc_tag,
                            image: 'https://xrs-users-management.herokuapp.com/' + product.avatar
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

    return <div>
        <MaterialTable
            title="Manage users permissions"
            columns={[
                {
                title: 'Image', field: 'image', render: rowData => (
                    <img src={rowData.image}
                        style={{ height: 36, borderRadius: '50%' }}
                        alt="another"

                    />
                ), editable: 'never'
            },
            { title: 'Firstname', field: 'firstname' },
            { title: 'Lastname', field: 'lastname' },
            { title: 'Joined', field: 'joined', type: 'date' },
            {
                title: 'NFC TAG',
                field: 'nfc_id',
            },
            ]}
            // data={[
            //     { image: 'http://localhost:4001/uploads/5ec8eaeb1afb2908583781ed/5ec8eaeb1afb2908583781ed_res_629ac4c0be91b2d8e4753671cb738547_450x450_ljj8.jpg', firstname: 'Mehmet', lastname: 'Baran', joined: 1987, birthCity: 63 },
            //     { image: 'http://localhost:4001/uploads/5ec8eaeb1afb2908583781ed/5ec8eaeb1afb2908583781ed_res_629ac4c0be91b2d8e4753671cb738547_450x450_ljj8.jpg', firstname: 'Zerya Betül', lastname: 'Baran', joined: 2017, birthCity: 34 },
            // ]}
            data={allUsers}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => handleMakeAdmin(event, rowData)
                }
            ]}
            components={{
                Action: props => (
                    <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{ textTransform: 'none' }}
                        size="small"
                    >
                        MAKE OPERATOR
                    </Button>
                ),
            }}
        />

        <ToastContainer autoClose={2000} />

    </div>

};
export default ManageAccounts;