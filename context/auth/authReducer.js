import {
    REGISTRY_SUCCESS,
    REGISTRY_ERROR,
    CLEAN_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    AUTHENTICATED_USER
} from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRY_SUCCESS:
        case REGISTRY_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('rns_token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;