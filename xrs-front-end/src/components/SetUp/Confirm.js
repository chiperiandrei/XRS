import React, {Component} from 'react';

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        //TODO insert data into database via REST API
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: { firstName, lastName, email, password }
        } = this.props;
        return (
            <div>
                <h2>You're gonna register with these informations</h2>
                <b>First name</b> {firstName}<br/>
                <b>Last name</b> {lastName}<br/>
                <b>Email</b> {email}<br/>
                <b>Password</b> {password}<br/>
                <button
                    color="secondary"
                    onClick={this.back}
                >Back</button>

                <button
                    color="primary"
                    onClick={this.continue}
                >Continue</button>
            </div>

        );
    }
}

export default Confirm;