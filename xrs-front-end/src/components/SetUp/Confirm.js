import React, {Component} from 'react';
import axios from 'axios';

export class Confirm extends Component {
    continue = e => {

        e.preventDefault();

        const {
            values: {firstName, lastName, email, password, companyName}
        } = this.props;
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(password)
        console.log(companyName)
        const data = {
            appname: companyName,
            opfname: firstName,
            oplname: lastName,
            email: email,
            password: password

        };
        axios.post('http://localhost:4000/api/files/setup', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        //TODO insert data into database via REST API
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: {firstName, lastName, email, password, companyName}
        } = this.props;
        return (
            <div id="centru">
                <h2>You're gonna register with these informations</h2>
                <b>First name</b> {firstName}<br/>
                <b>Last name</b> {lastName}<br/>
                <b>Email</b> {email}<br/>
                <b>pass</b> {password}<br/>
                <b>cn</b> {companyName}<br/>
                <button
                    color="secondary"
                    onClick={this.back}
                >Back
                </button>

                <button
                    color="primary"
                    onClick={this.continue}
                >Continue
                </button>
            </div>

        );
    }
}

export default Confirm;
