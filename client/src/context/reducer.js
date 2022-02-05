import { DISPLAY_ALERT } from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            };
    }

    throw new Error(`No such action: ${action.type}`);
};

export default reducer;