import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Home = () => {

  // extract the authenticated user from localStorage
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  // extract the error message of files
  const AppContext = useContext(appContext);
  const { message_file, url } = AppContext;

  useEffect(() => {
    userAuthenticated()
  }, []) // use an empty array when the function only execute once

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url
          ? (<>
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-red-700 text-3xl uppercase">Your URL is: </span>{`${process.env.frontendURL}/links/${url}`}
            </p>
            <button
                type="button"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
            >Copy Link</button>
          </>)
          : (<>
            {message_file && <Alert />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg p-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Share files in a easy way</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNodeSend </span>allows you to share files with end-to-end encryption. You can keep what you share private and make sure your stuff doesn't stay online forever.
            </p>
                <Link href="/signup">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700 uppercase">Sign Up</a>
                </Link>
              </div>
            </div>
          </>)
        }
      </div>
    </Layout>
  );
}

export default Home;