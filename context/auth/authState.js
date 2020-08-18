import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTRY_SUCCESS,
    REGISTRY_ERROR,
    CLEAN_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    AUTHENTICATED_USER,
    LOGOUT
} from '../../types';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {

    // define initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('rns_token') : '',
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
            });

        } catch (error) {
            dispatch({
                type: REGISTRY_ERROR,
                payload: error.response.data.msg
            });
        }

        // clean the alert message after 3 seconds
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    // authenticate users
    const logIn = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }

        // clean the alert message after 3 seconds
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    // return authenticated user based on JWT
    const userAuthenticated = async () => {
        const token = localStorage.getItem('rns_token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');
            dispatch({
                type: AUTHENTICATED_USER,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    // log out
    const logOut = () => {
        dispatch({
            type: LOGOUT
        });
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registryUser,
                logIn,
                userAuthenticated,
                logOut
            }}
        >
            {children}
        </authContext.Provider>
    );
}

export default AuthState;