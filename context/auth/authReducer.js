import { REGISTRY_SUCCESS } from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRY_SUCCESS:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;