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
                <h1>Company Info</h1>
                <div className='row'>
                    <div className='six columns'>
                        <label>Company name</label>
                        <input
                            className='u-full-width'
                            type='text'
                            placeholder="Company name"
                            onChange={handleChange('companyName')}
                            defaultValue={values.companyName}
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
