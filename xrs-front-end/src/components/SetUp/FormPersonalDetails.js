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
            <div>
                <h1>User Login Details</h1>
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
                        <label>Confirm email</label>
                        <input
                            className='u-full-width'
                            placeholder='Confirm email'
                            type='email'
                            onChange={handleChange('emailConfirm')}
                            defaultValue={values.emailConfirm}
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
                <div className='row'>
                    <div className='six columns'>
                        <label>Confirm password</label>
                        <input
                            className='u-full-width'
                            placeholder='Confirm Password'
                            type='password'
                            onChange={handleChange('passwordConfirm')}
                            defaultValue={values.passwordConfirm}
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