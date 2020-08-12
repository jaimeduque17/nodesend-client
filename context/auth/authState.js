import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

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

    return (  
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message
            }}
        >
            {children}
        </authContext.Provider>
    );
}
 
export default AuthState;