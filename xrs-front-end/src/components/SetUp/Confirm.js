import React, { Component } from 'react';
import axios from 'axios';

export class Confirm extends Component {
    continue = e => {

        e.preventDefault();

        const {
            values: { firstName, lastName, email, password, companyName, NFCADMINID }
        } = this.props;
        const data = {
            appname: companyName,
            opfname: firstName,
            oplname: lastName,
            email: email,
            password: password,
            NFCADMINID: NFCADMINID

        };
        const data_for_login = {
            name: `${firstName} ${lastName}`,
            email: email,
            password: password
        }
        console.log(data_for_login)
        axios.post('http://localhost:5000/api/ums/register', data_for_login)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


        axios.post('http://localhost:4000/api/files/setup', data, {
            headers: {
                "auth-token": 'SECRET_KEY_VERIFY_FOR_USE_APP'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: { firstName, lastName, email, companyName, NFCADMINID }
        } = this.props;
        return (
            <div id="centru">
                <h2>You're gonna register with these informations</h2>
                <b>Company Name</b> {companyName}<br />
                <b>First name</b> {firstName}<br />
                <b>Last name</b> {lastName}<br />
                <b>Email</b> {email}<br />
                <b>NFC ID ACCESS CARD</b> {NFCADMINID}<br />
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
