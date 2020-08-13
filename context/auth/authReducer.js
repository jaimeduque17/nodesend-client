import { REGISTRY_SUCCESS, REGISTRY_ERROR, CLEAN_ALERT } from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRY_SUCCESS:
        case REGISTRY_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}

export default authReducer;