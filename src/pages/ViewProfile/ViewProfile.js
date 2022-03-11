import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ViewProfile = () => {
    const {user} = useAuth();
    return (
        <div className="flex flex-col items-center justify-center my-10">
            <img className="h-36 w-36" src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt="" />
            <h2 className="text-3xl mt-1 font-bold">{user.displayName}</h2>
            <p className="mt-1">{user.email}</p>
            <Link to="/dashboard" className="my-4 justify-self-center items-center py-1.5 px-7 border-2 border-purple-700 rounded-md text-xl font-bold text-purple-900 bg-pink-200 hover:bg-purple-700 hover:text-white">Back to Dashboard</Link>
        </div>
    );
};

export default ViewProfile;