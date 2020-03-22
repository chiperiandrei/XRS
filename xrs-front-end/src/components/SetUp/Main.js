import React, {Component} from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import Home from "../../pages/Home";

export class Main extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        company_name: '',
        NFCADMINID: ''
    };

    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    };

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    };
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    render() {
        const {step} = this.state;
        const {firstName, lastName, email, password, companyName, NFCADMINID} = this.state;
        const values = {firstName, lastName, email, password, companyName, NFCADMINID};

        switch (step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <FormPersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 4:
                return <Success/>;
            default:
                return <Home/>
        }
    }
}

export default Main;
