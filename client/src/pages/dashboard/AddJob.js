import React from 'react';

import FormRow from '../../components/FormRow';
import Alert from '../../components/Alert';
import FormRowSelect from '../../components/FormRowSelect';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        statusOptions,
        status,
        handleChange,
        clearValues,
        createJob,
    } = useAppContext();

    const handleJobInput = e => {
        const name = e.target.name;
        const value = e.target.value;

        handleChange({name, value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }

        if (isEditing) {
            return;
        }

        createJob();
    };

    const handleClear = e => {
        e.preventDefault();
        clearValues();
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
                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    <FormRowSelect
                        name='jobType'
                        labelText='type'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    <div className="btn-container">
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >submit</button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={handleClear}
                        >clear</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;