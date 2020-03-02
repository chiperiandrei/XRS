import React, { Component } from 'react';
export class FormPersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            <div id="centru">
                <h1>User Login Details</h1>
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
                        <label>NFC ID</label>
                        <input
                            className='u-full-width'
                            type='text'
                            placeholder="Enter Your NFC ID"
                            onChange={handleChange('NFCADMINID')}
                            defaultValue={values.NFCADMINID}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='six columns'>
                        <label>Your email</label>
                        <input
                            className='u-full-width required'
                            placeholder='test@mailbox.com'
                            type='email'
                            onChange={handleChange('email')}
                            defaultValue={values.email}
                            autoFocus
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='six columns'>
                        <label>Password</label>
                        <input
                            className='u-full-width required'
                            placeholder='Password'
                            type='password'
                            onChange={handleChange('password')}
                            defaultValue={values.password}
                            autoFocus
                        />
                    </div>
                </div>
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

export default FormPersonalDetails;
