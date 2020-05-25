import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";

const BorrowsHistory = props => {
    const handlePick = pick => {
        Axios.post('http://localhost:4002/api/borrows/pick/' + pick, null, {
            headers: {
                "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2),
            }
        })
            .then(res => toast.success(res.data))
            .catch(err => toast.error("Something went wrong"))
    }
    const [show, setShow] = useState(false)
    const borrows = useSelector(state => state.borrows)
    const list = borrows.map(borrow => <li><img src={`http://localhost:4001/${borrow.images[0]}`} id="small-image" />{borrow.name} <input type="checkbox" onClick={() => handlePick(borrow._id)} id={borrow._id}></input></li>)
    if (show) {
        return <div><h1>Pick products for take</h1><ol>{list}</ol><button onClick={() => setShow(!show)}>Hide my current borrows</button></div>
    } else {
        return <button onClick={() => setShow(!show)}>Show my current borrows</button>
    }

};
export default BorrowsHistory;