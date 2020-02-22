import React, {Component} from 'react';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const {values, handleChange} = this.props;
        return (
            <div id="centru">
                <h1>User Personal Info</h1>
                <div className='row'>
                    <div className='six columns'>
                        <label>Last Name</label>
                        <input
                            className='u-full-width'
                            type='text'
                            placeholder="Enter Your Last Name"
                            onChange={handleChange('lastName')}
                            defaultValue={values.lastName}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='six columns'>
                        <label>First Name</label>
                        <input
                            className='u-full-width'
                            type='text'
                            placeholder="Enter Your First Name"
                            onChange={handleChange('firstName')}
                            defaultValue={values.firstName}
                        />
                    </div>
                </div>

                <button
                    color="primary"
                    onClick={this.continue}
                >Continue</button>
            </div>
        );
    }
}

export default FormUserDetails;