import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs';

const Success = () => {
    return (
        <div className="text-center my-5">
            <div className="flex mb-3 justify-center items-center">
                <p className="text-2xl md:text-4xl mr-2">Thank You</p>
                <BsEmojiSmile className="text-2xl md:text-4xl text-red-600" />
            </div>
            <p className="text-2xl md:text-4xl">Successfully submitted.</p>
        </div>
    );
};

export default Success;