import React from 'react';

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <select
                name={name}
                className="form-select"
                value={value}
                onChange={handleChange}
            >{list.map((itemValue, index) => (
                <option value={itemValue} key={index}>{itemValue}</option>
            ))}</select>
        </div>
    );
};

export default FormRowSelect;