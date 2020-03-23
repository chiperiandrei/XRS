import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SetUp from '../components/SetUp/SetUp'
import axios from 'axios';

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
        axios.get('http://localhost:4000/api/files/setup')
            .then(response => this.setState({
                exists: response.data.value,
                company_name: response.data.company_name,
                created_by: `${response.data.operatorLname} ${response.data.operatorFname}`,
                email: response.data.email,
                year: response.data.date_created
            }))
            .catch(err => console.log(err))
    }

    render() {
        const arr = [['/signin','Sign in'],['/signup','SIGN UP'],['/','Home']];
        if (this.state.exists === true) {
            return [<Header companyname={this.state.company_name} elements={arr}/>, <h1>Hello</h1>,
                <Footer datecreated={this.state.year} authorname={this.state.created_by}/>]
        }
        if (this.state.exists === false) {
            return [<Header companyname="X" elements={arr}/>, <SetUp/>, <Footer datecreated='2020' authorname='Andrei Chiperi'/>]
        }
    }
}

export default Home;
