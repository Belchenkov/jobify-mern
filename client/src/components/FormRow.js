import React from 'react';

const FormRow = ({
                     type,
                     name,
                     value,
                     labelText,
                     handleChange,
                 }) => {
    return (
        <div className="form-row">
            <label
                htmlFor={name}
                className='form-label'
            >{labelText}</label>
            <input
                type={type}
                value={value}
                name={name}
                className='form-input'
                onChange={handleChange}
            />
        </div>
    );
};

export default FormRow;