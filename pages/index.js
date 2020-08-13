import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Home = () => {

  // extract the authenticated user from localStorage
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  useEffect(() => {
    userAuthenticated()
  }, []) // use an empty array when the function only execute once

  return (  
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
}
 
export default Home;