import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {

    // extract the authenticated user from localStorage
    const AuthContext = useContext(authContext);
    const { userAuthenticated, user, logOut } = AuthContext;

    useEffect(() => {
        userAuthenticated()
    }, []) // use an empty array when the function only execute once

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
            </Link>
            <div>
                {
                    user
                        ?
                        <div className="flex items-center">
                            <p className="mr-2">{`Hola ${user.name}`}</p>
                            <button
                            type="button"
                            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                            onClick={() => logOut()}>Log out</button>
                        </div>
                        : <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Log in</a>
                            </Link>
                            <Link href="/signup">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Sign up</a>
                            </Link>
                        </>
                }

            </div>
        </header>
    );
}

export default Header;