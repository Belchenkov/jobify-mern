import React from 'react';

import FormRow from '../../components/FormRow';
import Alert from '../../components/Alert';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        statusTypeOptions,
        status,
    } = useAppContext();

    const handleJobInput = e => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(name, 'name');
        console.log(value, 'value');
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }

        console.log('create job');
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{ isEditing ? 'edit job' : 'add job' }</h3>
                { showAlert && <Alert /> }
                <div className="form-center">
                    <FormRow
                        type='text'
                        name="position"
                        value={position}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        name="company"
                        value={company}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        name="jobLocation"
                        labelText="Job Location"
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    <div className="form-row">
                        <label htmlFor="jobType" className="form-label">
                            job type
                        </label>
                        <select
                            name="jobType"
                            className="form-select"
                            value={jobType}
                            onChange={handleJobInput}
                        >{jobTypeOptions.map((itemValue, index) => (
                            <option value={itemValue} key={index}>{itemValue}</option>
                        ))}</select>
                    </div>
                    <div className="btn-container">
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                        >submit</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;