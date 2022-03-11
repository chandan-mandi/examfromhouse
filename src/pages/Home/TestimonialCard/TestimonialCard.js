import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaQuoteRight } from 'react-icons/fa';

const TestimonialCard = (props) => {
    const { review, name, role, img } = props.review;
    return (
        <div className="w-full">
            <div className="p-4 md:w-1/2 w-full mx-auto">
                <div className="h-full bg-gray-100 shadow-inner hover:shadow-lg p-8 rounded">
                    <p className="text-gray-400 text-xl pb-3">
                        {<FaQuoteRight />}
                    </p>
                    <p className="leading-relaxed mb-6">{review}</p>
                    <div className="inline-flex items-center">
                        <div className="w-14 h-14 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-4xl">
                            {img ? <img className="rounded-full" src={img} alt="" /> : <AiOutlineUser />}
                        </div>
                        <span className="flex-grow flex flex-col pl-4">
                            <span className="title-font font-medium text-gray-900">{name}</span>
                            <span className="text-gray-500 text-sm">{role}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;