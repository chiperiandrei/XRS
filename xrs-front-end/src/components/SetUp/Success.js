import React, {Component} from 'react';

export class Success extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (

            <h1>Thank You For Your Submission</h1>

        );
    }
}

export default Success;