import { useState } from 'react';

import Logo from '../components/Logo.js';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';
import { useAppContext } from '../context/appContext';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
};

const Register = () => {
    const [values, setValues] = useState(initialState);
    const { isLoading, showAlert, alertText, alertType } = useAppContext();

    const toggleMember = () => {
        setValues({
            ...values,
            isMember: !values.isMember,
        })
    };

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
                <h3>{ values.isMember ? 'Login' : 'Register' }</h3>
                { showAlert && <Alert type={alertType} message={alertText} /> }

                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        labelText='name'
                        value={values.name}
                        handleChange={handleChange}
                    />)
                }
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
                <p>
                    { values.isMember ? 'Not a member yet?': 'Already a member?' }
                    <button
                        type='button'
                        className='member-btn'
                        onClick={toggleMember}
                    >
                        { values.isMember ? 'Register': 'Login' }
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;