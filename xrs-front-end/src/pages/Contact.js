import axios from 'axios';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCompanyInfo } from "../actions/companyInfoActions";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SetUp from '../components/SetUp/SetUp';
import ContactFormular from "../components/ContactForm";

const Contact = props => {
    const dispatch = useDispatch();
    const company_info = useSelector(state => state.company_info)

    useEffect(() => {
        axios.get('http://localhost:4000/api/files/setup')
            .then(response => {
                dispatch(saveCompanyInfo(response.data))
            })
            .catch(err => console.log(err));
    }, [dispatch]);
    if (company_info !== null) {
        document.title = `${company_info.company_name} Reserve System`
        return [<Header companyname={company_info.company_name} />, <ContactFormular></ContactFormular>,
        <Footer datecreated={company_info.date_created} authorname={`${company_info.operatorFname} ${company_info.operatorLname}`} />]
    }
    else {
        return [<Header companyname="X" />, <SetUp />, <Footer datecreated='2020' authorname='Andrei Chiperi' />]
    }

}

export default Contact;