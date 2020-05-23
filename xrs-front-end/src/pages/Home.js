import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SetUp from '../components/SetUp/SetUp'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { saveCompanyInfo } from "../actions/companyInfoActions";

const Home = props => {
    const dispatch = useDispatch();
    const company_info = useSelector(state => state.company_info)

    useEffect(() => {
        axios.get('https://xrs-files-management.herokuapp.com/api/files/setup')
            .then(response => {
                dispatch(saveCompanyInfo(response.data))
            })
            .catch(err => console.log(err));
    }, [dispatch]);
    if (company_info !== null) {
        document.title = `${company_info.company_name} Reserve System`
        return [<Header companyname={company_info.company_name} />, <h1>Hello</h1>,
        <Footer datecreated={company_info.date_created} authorname={`${company_info.operatorFname} ${company_info.operatorLname}`} />]
    }
    else {
        return [<Header companyname="X" />, <SetUp />, <Footer datecreated='2020' authorname='Andrei Chiperi' />]
    }

}

export default Home;
