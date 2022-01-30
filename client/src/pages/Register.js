import { useState } from 'react';

import Logo from '../components/Logo.js';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false,
};

const Register = () => {
    const [values, setValues] = useState(initialState);

    const handleChange = e => {

    };

    const submit = e => {
        e.preventDefault();
    };

    return (
        <Wrapper className='full-page'>
            <form
                className='form'
                onSubmit={submit}
            >
                <Logo />
                <h3>Login</h3>
                { values.showAlert && <Alert type='danger' message='Error' /> }

                <FormRow
                    type='text'
                    name='name'
                    labelText='name'
                    value={values.name}
                    handleChange={handleChange}
                />
                <FormRow
                    type='email'
                    name='email'
                    labelText='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow
                    type='password'
                    labelText='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />

                <button
                    type='submit'
                    className='btn btn-block'
                >Submit</button>
            </form>
        </Wrapper>
    );
};

export default Register;