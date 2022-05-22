import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const {
        isLoading,
        showAlert,
        alertText,
        alertType,
        displayAlert,
        clearAlert,
        registerUser,
        user,
    } = useAppContext();

    const toggleMember = () => {
        setValues({
            ...values,
            isMember: !values.isMember,
        })
    };

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const submit = e => {
        e.preventDefault();

        const { name, email, password, isMember } = values;

        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            clearAlert();
            return false;
        }

        const currentUser = {
            name,
            email,
            password,
        };

        registerUser(currentUser);
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [user, navigate]);

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
                    disabled={isLoading}
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