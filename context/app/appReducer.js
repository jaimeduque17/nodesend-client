// second
import {
    SHOW_ALERT,
    CLEAN_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR
} from '../../types';

const appReducer = (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message_file: action.payload
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message_file: null
            }
        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                name_original: action.payload.name_original,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                message_file: action.payload,
                loading: null
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                ulr: action.payload
            }
        default:
            return state
    }
}

export default appReducer;