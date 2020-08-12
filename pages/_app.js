import React, { useReducer } from 'react';
import AuthState from '../context/auth/authState';

const MyApp = ({ Component, pageProps }) => {

  return (  
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  );
}
 
export default MyApp;