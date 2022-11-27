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
    GET_JOBS_ERROR,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_ERROR,
    EDIT_JOB_SUCCESS,
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            };
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            };
        case SETUP_USER_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case SETUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText,
            }
        case SETUP_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
        case UPDATE_USER_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Profile: Updated!',
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
        case GET_JOBS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false,
            };
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages,
            }
        case GET_JOBS_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
        case SET_EDIT_JOB:
            const job = state.jobs.find(job => job._id === action.payload.id);
            return {
                ...state,
                ...job,
                editJobId: action.payload.id,
                isEditing: true,
            };
        case DELETE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Job: Created!',
            }
        case CREATE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
        case EDIT_JOB_BEGIN:
            return {
                ...state,
                isLoading: true,
            };
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job: Updated!',
            }
        case EDIT_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
        case HANDLE_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case CLEAR_VALUES:
            return {
                ...state,
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending',
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar,
            };
        case LOGOUT_USER:
            return {
                ...initialState,
                user: null,
                token: null,
                jobLocation: '',
                userLocation: '',
            };
        default:
            throw new Error(`No such action: ${action.type}`);
    }
};

export default reducer;