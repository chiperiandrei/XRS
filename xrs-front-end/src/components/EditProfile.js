import React, { useState } from "react";
import Axios from "axios";



//redux

import { useDispatch } from "react-redux";
import { logInUser } from "../actions/userActions";

//Notification section
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const EditProfile = props => {
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const token = localStorage.getItem("user_info")

    const handlePassword = (e) => {
        newPassword !== e.target.value ? setError('Passwords dont match') : setError('')
    }
    const handleForm = (e) => {
        e.preventDefault()
        const newObj = {}
        if (newEmail !== '') {
            newObj.email = newEmail
        }
        if (newFirstName !== '') {
            newObj.firstname = newFirstName
        }
        if (newLastName !== '') {
            newObj.lastname = newLastName
        }
        if (newPassword !== '') {
            newObj.password = newPassword
        }
        Axios.post('https://xrs-users-management.herokuapp.com/api/ums/users/' + props.userInfo.id, newObj, {
            headers: {
                "auth-token": token.substr(1, token.length - 2)
            }
        })
            .then((response) => {
                toast.success(response.data.message)
                dispatch(logInUser(response.data.token))
            })
            .catch((error) => {
                toast.error(error.response.data)

            })
    }
    let form = <div>
        <h1>Edit profile</h1>
        <span>{error}</span>
        <form>
            <p>First name</p>
            <input
                type="text"
                placeholder={props.userInfo.firstname}
                onChange={e => setNewFirstName(e.target.value)}
            />
            <p>Last name</p>
            <input
                type="text"
                placeholder={props.userInfo.lastname}
                onChange={e => setNewLastName(e.target.value)}

            />
            <p>Email</p>
            <input
                type="text"
                placeholder={props.userInfo.email}
                onChange={e => setNewEmail(e.target.value)}

            />
            <p>Password</p>
            <input
                type="password"
                placeholder="*********"
                onChange={e => setNewPassword(e.target.value)}

            />
            <p>Retype password</p>
            <input
                type="password"
                placeholder="**********"
                onChange={e => handlePassword(e)}
            />
            <button onClick={e => handleForm(e)}>Save profile</button></form>
        <ToastContainer autoClose={2000} /></div>
    return form
};
export default EditProfile;