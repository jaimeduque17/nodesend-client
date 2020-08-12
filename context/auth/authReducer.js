import { AUTHENTICATED_USER } from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
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