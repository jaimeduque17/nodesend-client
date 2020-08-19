// third
import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
    SHOW_ALERT,
    CLEAN_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR
} from '../../types';
import clientAxios from '../../config/axios';

const AppState = ({ children }) => {

    const initialState = {
        message_file: null,
        name: '',
        name_original: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    }

    // create dispatch and state
    const [state, dispatch] = useReducer(appReducer, initialState);

    // show alert
    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 3000);
    }

    // upload the files to the server
    const uploadFile = async (formData, nameFile) => {
        dispatch({
            type: UPLOAD_FILE
        });
        try {
            const result = await clientAxios('/api/files', formData);
            console.log(result.data);
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: result.data.file,
                    name_original: nameFile
                }
            });
        } catch (error) {
            // console.log(error);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.result.data.msg
            });
        }
    }

    // create a link
    const createLink = async () => {
        const data = {
            name: state.name,
            name_original: state.name_original,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const result = await clientAxios.post('/api/links', data);
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: result.data.msg
            });
        } catch (error) {
           console.log(error);
        }
    }

    return (
        <appContext.Provider
            value={{
                message_file: state.message_file,
                name: state.name,
                name_original: state.name_original,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink
            }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;