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
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    token,
    user: user ? JSON.parse(user) : null,
    userLocation: userLocation ?? '',
    jobLocation: userLocation ?? '',
    showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    authFetch.interceptors.request.use((config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`;
        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    authFetch.interceptors.response.use((response) => {
        return response;
    }, (err) => {
        return Promise.reject(err);
    });

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
        dispatch({
            type: UPDATE_USER_BEGIN,
        });

        try {
            const { data } = await authFetch.patch('/auth/update-user', currentUser);

            const { user, location, token } = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {
                    user,
                    location,
                    token,
                },
            });

            addUserToLocalStorage({ user, location, token });
        } catch (err) {
            console.error(err.response);
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            });
        }

        clearAlert();
    };

    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
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