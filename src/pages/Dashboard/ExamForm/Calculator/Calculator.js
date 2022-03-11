import React, { useState } from 'react';

const Calculator = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const handleClick = (e) => {
        setValue(value.concat(e.target.name));
    }
    const handleAllClear = () =>{
        setValue('')
        setResult('');
    }
    const handleClear = () =>{
        setValue(value.slice(0, -1));
    }
    const handleCalculate = () =>{
        setResult(eval(value));
    }
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="w-64 h-auto bg-white rounded-2xl shadow-2xl border-4 border-gray-100">
                    <div className="w-auto m-3 h-28 text-right space-y-2 py-2">
                        <input
                            type="text"
                            value={value}
                            className="w-full text-4xl focus:outline-none text-right"
                        />
                        <input
                            type="text"
                            value={result}
                            className="w-full text-4xl focus:outline-none text-right"
                        />
                    </div>
                    <div className="w-auto px-2 h-auto mb-2 grid grid-cols-4 gap-4">
                        <button
                            name="all-clear"
                            className="bg-red-500 text-white p-2 rounded-lg font-bold"
                            onClick={handleAllClear}
                            >AC</button>
                        <button
                            name="clear"
                            className="bg-yellow-500 text-white p-2 rounded-lg font-bold"
                            onClick={handleClear}
                            >C</button>
                        <button
                            name="%"
                            className="bg-gray-500 text-white p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >%</button>
                        <button
                            name="/"
                            className="bg-gray-400 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >/</button>
                        <button
                            name="7"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >7</button>
                        <button
                            name="8"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >8</button>
                        <button
                            name="9"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >9</button>
                        <button
                            name="*"
                            className="bg-gray-400 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >&times;</button>
                        <button
                            name="4"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >4</button>
                        <button
                            name="5"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >5</button>
                        <button
                            name="6"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >6</button>
                        <button
                            name="-"
                            className="bg-gray-400 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >-</button>
                        <button
                            name="1"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >1</button>
                        <button
                            name="2"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >2</button>
                        <button
                            name="3"
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >3</button>
                        <button
                            name="+"
                            className="bg-gray-400 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >+</button>
                        <button
                            name="0"
                            className="col-span-2 bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >0</button>
                        <button
                            name="."
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleClick}
                        >.</button>
                        <button
                            name="="
                            className="bg-gray-200 p-2 rounded-lg font-bold"
                            onClick={handleCalculate}
                        >=</button>
                    </div>
                    <div className="flex justify-center mt-3 mb-2">
                        <div className="w-20 h-1 bg-gray-100 rounded-l-xl rounded-r-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;