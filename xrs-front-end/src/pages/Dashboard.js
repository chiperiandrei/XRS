import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeComponent from '../components/Welcome';

import { useSelector } from "react-redux";

const Dashboard = props => {
    const company_info = useSelector(state => state.company_info)
    const userInfo = useSelector(state => state.user_information);

    return [<Header companyname={company_info !== null ? company_info.company_name : "X"} />,
    <WelcomeComponent />,
    <Footer datecreated={company_info !== null ? company_info.date_created : "2020"} authorname={company_info !== null ? `${company_info.operatorFname} ${company_info.operatorLname}` : "Andrei Chiperi"} />]

}

export default Dashboard;
