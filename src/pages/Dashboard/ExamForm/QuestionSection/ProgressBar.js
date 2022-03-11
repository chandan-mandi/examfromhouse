import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import Calculator from '../Calculator/Calculator';

const ProgressBar = ({ next, prev, submit, submitQuiz }) => {
    const [showCalculator, setShowCalculator] = useState(false);
    return (
        <>
            {
                showCalculator && <div className="flex flex-col justify-center">
                    <button onClick={(e) => setShowCalculator(false)} className="flex justify-center text-4xl">{<ImCross className="text-red-700 border-2 p-2 rounded-full my-2 border-red-700 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none" />}</button>
                    <Calculator />
                </div>
            }
            <div className="flex items-center justify-between py-8">
                <button
                    onClick={prev}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    <span>Prev Question</span>
                </button>
                <button onClick={e => setShowCalculator(true)} className={!showCalculator ? "text-xl bg-purple-700 text-white rounded-md px-5 py-2 block" : "text-xl bg-purple-700 text-white rounded-md px-5 py-2 hidden"}>
                    Calculator
                </button>
                <button
                    onClick={submitQuiz ? submit : next}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    <span>{submitQuiz ? "Submit Quiz" : "Next Question"}</span>
                </button>
            </div>
        </>
    );
};

export default ProgressBar;