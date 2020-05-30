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


        Axios.post('https://xrs-users-management.herokuapp.com/api/ums/users/addoperator/' + data.nfc_id, null, {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        }).then(res => {
            toast.success(data.firstname + " " + data.lastname + " is now operator")
        })
            .catch(err => {
                toast.error("Something went wrong")
            })

    }


    let allUsers = query =>
        new Promise((resolve, reject) => {
            Axios.get('https://xrs-users-management.herokuapp.com/api/ums/users/', {
                headers: {
                    "auth-token": token.substr(1, token.length - 2)
                }
            })
                .then(function (response) {
                    let products = []
                    products = response.data.map(product => {
                        const myDate = new Date(product.joined)
                        var displayDate = myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
                        return {
                            firstname: product.firstName,
                            lastname: product.lastName,
                            joined: displayDate,
                            nfc_id: product.nfc_tag,
                            image: 'https://xrs-users-management.herokuapp.com/' + product.avatar,
                            isOperator: product.isOperator === true ? 'yes' : 'no'
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
                { title: 'Is Operator?', field: 'isOperator' },
                { title: 'Joined', field: 'joined', type: 'date' },
                {
                    title: 'NFC TAG',
                    field: 'nfc_id',
                },
            ]}
            data={allUsers}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Make Admin',
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
                        disabled={props.data.isOperator === "no" ? false : true}
                    >
                        MAKE OPERATOR
                    </Button>
                ),
            }}
        />

        <ToastContainer autoClose={2000} draggable={true} />

    </div>

};
export default ManageAccounts;