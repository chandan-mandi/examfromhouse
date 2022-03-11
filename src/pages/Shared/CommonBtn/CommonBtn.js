import React from 'react';
import { Link } from 'react-router-dom';

const CommonBtn = ({ title, destination }) => {
    return (
        <Link to={destination} className="bg-indigo-700 hover:bg-indigo-900 text-white text-center text-2xl py-2 px-4 rounded-full">{title}
        </Link>
    );
};

export default CommonBtn;