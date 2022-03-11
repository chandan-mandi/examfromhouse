import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Exam = () => {
    const [questionCode, setQuestionCode] = useState('');
    return (
        <div className="py-4 flex flex-col items-center justify-center">
            <div className="w-full md:w-1/2 my-7 px-6 md:px-0">
                <input
                    type="text"
                    name=""
                    id=""
                    className="w-full text-lg border mb-3 py-2 rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                    placeholder="Question Code"
                    onBlur={(e) => setQuestionCode(e.target.value)}
                    required="required"
                />
                <div className="text-center">
                    <Link to={`/examForm/${questionCode}`}><button className="text-xl my-5 bg-purple-700 text-white rounded-md px-5 py-2">Find Exam</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Exam;