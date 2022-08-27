import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import reducer from './reducer';
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    SETUP_USER_BEGIN,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: null,
    userLocation: userLocation ?? '',
    jobLocation: userLocation ?? '',
    showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const setupUser = async ({ currentUser, endpoint, alertText }) => {
        dispatch({
            type: SETUP_USER_BEGIN,
        });

        try {
            const response = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);
            const { user } = response.data;
            const { token, location } = user;

            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    alertText,
                },
            });

            addUserToLocalStorage({ user, token, location });
        } catch (error) {
            console.error(error.response);
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            });
        }

        clearAlert();
    };

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    };

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR,
        });
    };

    const logoutUser = () => {
        dispatch({
            type: LOGOUT_USER,
        });
        removeUserFromLocalStorage();
    };

    const updateUser = async currentUser => {

    };

    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
    }}>{ children }</AppContext.Provider>;
}

const useAppContext = () => {
    return useContext(AppContext);
};

export {
    AppProvider,
    useAppContext,
    initialState,
};