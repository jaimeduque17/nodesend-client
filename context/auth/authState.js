import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { REGISTRY_SUCCESS } from '../../types';

import clientAxios from '../../config/axios';

const AuthState = ({children}) => {

    // define initial state
    const initialState = {
        token: '',
        authenticated: null,
        user: null,
        message: null
    }

    // define reducer
    // dispatch call the functions in the reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // registry new users
    const registryUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            dispatch({
                type: REGISTRY_SUCCESS,
                payload: response.data.msg
            })
        } catch (error) {
            console.log(error);
        }
    }

    // authenticated user
    const userAuthenticated = name => {
        dispatch({
            type: AUTHENTICATED_USER,
            payload: name
        })
    }

    return (  
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registryUser,
                userAuthenticated
            }}
        >
            {children}
        </authContext.Provider>
    );
}
 
export default AuthState;