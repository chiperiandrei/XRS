import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Register from '../components/Register';

class CreateAccount extends React.Component {
    render() {

        if (localStorage.getItem("exists") === "true") {
            return [<Header companyname={localStorage.getItem("companyName")} />, <Register />
                , <Footer datecreated={localStorage.getItem("year")} authorname={localStorage.getItem("author_name")} />]
        }
        else {
            return [<Header companyname="X" />, <Register />
                , <Footer datecreated='2020' authorname='Andrei Chiperi' />]
        }

    }
}

export default CreateAccount;
