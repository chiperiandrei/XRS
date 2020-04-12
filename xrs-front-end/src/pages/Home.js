import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SetUp from '../components/SetUp/SetUp'
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            nrIter: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/files/setup')
            .then(response => {
                localStorage.setItem("exists", response.data.value);
                localStorage.setItem("companyName", response.data.company_name);
                localStorage.setItem("author_name", `${response.data.operatorLname} ${response.data.operatorFname}`);
                localStorage.setItem("year", response.data.date_created);
                let nrIterNew = this.state.nrIter + 1;
                this.setState({
                    nrIter: nrIterNew
                })
                

            })
            .catch(err => console.log(err));

    }

    render() {
        const arr = [['/signin', 'Sign in'], ['/signup', 'SIGN UP'], ['/', 'Home']];
        if (localStorage.getItem("exists") === "true") {
            document.title = `${localStorage.getItem("companyName")} Reserve System`
            return [<Header companyname={localStorage.getItem("companyName")} elements={arr} />, <h1>Hello</h1>,
            <Footer datecreated={localStorage.getItem("year")} authorname={localStorage.getItem("author_name")} />]
        }
        else {
            return [<Header companyname="X" elements={arr} />, <SetUp />, <Footer datecreated='2020' authorname='Andrei Chiperi' />]
        }
    }
}

export default Home;
