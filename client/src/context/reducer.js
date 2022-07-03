import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    SETUP_USER_BEGIN,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
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