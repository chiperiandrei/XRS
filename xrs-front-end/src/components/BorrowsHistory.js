import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";
import MaterialTable from 'material-table';


const BorrowsHistory = props => {
    const handlePick = pick => {
        pick.map(selected => {
            Axios.post('https://xrs-borrow-management.herokuapp.com/api/borrows/pick/' + selected.id, null, {
                headers: {
                    "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2),
                }
            })
                .then(res => toast.success(res.data))
                .catch(err => toast.error("Something went wrong"))
        }
        )

    }
    const [show, setShow] = useState(false)
    const borrows = useSelector(state => state.borrows)
    const elemets = borrows.map(borrow => {
        return {
            name: borrow.name,
            image: 'https://xrs-product-management.herokuapp.com/' + borrow.images[0],
            id: borrow._id
        }
    })
    if (show) {
        return <div>
            <MaterialTable
                title="Pick products for take"
                columns={
                    [
                        {
                            title: 'Name', field: 'name',
                            cellStyle: {
                                fontSize: 15
                            },
                            headerStyle: {
                                backgroundColor: '#45a1ff',
                                fontSize: 17
                            }
                        },
                        {
                            title: 'Image', field: 'image', render: rowData => (
                                <img src={rowData.image}
                                    style={{ height: 36, borderRadius: '50%' }}
                                    alt="another"

                                />
                            ),
                            editable: 'never',
                            cellStyle: {
                                fontSize: 15
                            },
                            headerStyle: {
                                backgroundColor: '#45a1ff',
                                fontSize: 17
                            }
                        }
                    ]
                }
                data={elemets}
                options={{
                    selection: true,
                    search: false
                }}
                actions={[
                    {
                        tooltip: 'Confirm pick',
                        icon: 'check',
                        onClick: (evt, data) => handlePick(data)
                    }
                ]}

            />
            <button onClick={() => setShow(!show)}>Hide my current borrows</button>
        </div>
    } else {
        return <button onClick={() => setShow(!show)}>Show my current borrows</button>
    }

};
export default BorrowsHistory;