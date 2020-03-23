import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Register from '../components/Register';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            exists: false,
            company_name: '',
            created_by: '',
            email: ''
        }
        
    }

    componentDidMount() {
    }

    render() {

            return [<Header companyname="X"/>,<Register/>
                , <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
        
    }
}

export default Home;
