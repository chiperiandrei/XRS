import React, {useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import SetUp from './SetUp/SetUp'

const Home = props => {
    function check_if_is_uploaded() {
        //TODO : api to check if config already exists
    }

    function upload_config_to_server() {
        //TODO : upload cfg to server
    }

    return [<Header companyname="X"/>, <SetUp/>, <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
};
export default Home;