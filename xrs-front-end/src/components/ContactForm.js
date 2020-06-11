import React, { useState } from "react";
import { ContactFormStyle } from '../assets/styles/ContactForm';
import axios from "axios";


//Notification section
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const ContactForm = props => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const submitEmail = (e) => {
        e.preventDefault()
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            message: message
        }
        axios.post('https://xrs-users-management.herokuapp.com/api/ums/contact', data)
            .then(res => { toast.success("Email has been sent!") })
            .catch(err => { toast.error("Something went wrong!") })
    }
    let form = <div>
        {/* <span>{error}</span> */}
        <form>
            <p>First name</p>
            <input
                type="text"
                placeholder="type your firstname"
                onChange={e => setFirstname(e.target.value)}
            />
            <p>Last name</p>
            <input
                type="text"
                placeholder="type your lastname"
                onChange={e => setLastname(e.target.value)}

            />
            <p>Email</p>
            <input
                type="text"
                placeholder="type your email"
                onChange={e => setEmail(e.target.value)}

            />
            <p>Message</p>
            <textarea placeholder="Write your message here" onChange={e => setMessage(e.target.value)} />

            <button onClick={e => submitEmail(e)}>Submit answer</button>
        </form>
        <ToastContainer autoClose={2000} />
    </div>

    return <ContactFormStyle>
        <h1 id="title"> Contact US</h1>
        {form}
    </ContactFormStyle>
};


export default ContactForm;
