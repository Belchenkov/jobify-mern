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
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation ?? '',
    showAlert: false,
    alertText: '',
    alertType: '',
    token,
    user: user ? JSON.parse(user) : null,
    userLocation: userLocation ?? '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    showSidebar: false,
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
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
        console.error(err.response);

        if (err.response.status === 401) {
            logoutUser();
        }

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
            if (err.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: {
                        msg: err.response.data.msg
                    }
                });
            }
        }

        clearAlert();
    };

    const handleChange = ({name, value}) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name,
                value,
            }
        });
    };

    const clearValues = () => {
        dispatch({
            type: CLEAR_VALUES,
        });
    };

    const getJobs = async () => {
        const url = '/jobs';

        dispatch({
            type: GET_JOBS_BEGIN,
        });

        try {
             const { data } = await authFetch(url);
             const { jobs, totalJobs, numOfPages } = data;

             dispatch({
                 type: GET_JOBS_SUCCESS,
                 payload: {
                     jobs,
                     totalJobs,
                     numOfPages,
                 },
             });
        } catch (err) {
            console.error(err.response);
            logoutUser();
        }
    };

    const createJob = async () => {
        dispatch({
            type: CREATE_JOB_BEGIN,
        });

        try {
            const {
                position,
                company,
                jobLocation,
                jobType,
                status,
            } = state;

            await authFetch.post('/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status,
            });

            dispatch({
                type: CREATE_JOB_SUCCESS,
            });

            clearValues();
        } catch (err) {
            if (err.response.status !== 401) {
                dispatch({
                    type: CREATE_JOB_ERROR,
                    payload: {
                        msg: err.response.data.msg
                    }
                });
            }
        }

        clearAlert();
    };

    const setEditJob = id => {
        dispatch({
            type: SET_EDIT_JOB,
            payload: { id },
        });
    };

    const editJob = () => {
        console.log('edit job');
    };

    const deleteJob = async id => {
        dispatch({
            type: DELETE_JOB_BEGIN,
        });

        try {
            await authFetch.delete(`/jobs/${id}`);
            await getJobs();
        } catch (err) {
            console.log(error.response);
        }
    };

    return <AppContext.Provider
        value={{
            ...state,
            displayAlert,
            clearAlert,
            setupUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            handleChange,
            createJob,
            clearValues,
            getJobs,
            setEditJob,
            editJob,
            deleteJob,
        }}
    >{ children }</AppContext.Provider>;
}

const useAppContext = () => {
    return useContext(AppContext);
};

export {
    AppProvider,
    useAppContext,
    initialState,
};