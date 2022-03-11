import React from 'react';

const FormTitle = ({ setExamTitle, setExamDescription, setExamMarks, setInstituteName, setExamTime }) => {
    return (
        <div className="bg-white text-left w-full md:w-2/3 rounded border-t-8 border-b-8 border-blue-800 p-7 filter drop-shadow-lg">
            <div className="flex flex-col w-full md:w-1/2 items-center mx-auto">
                <input
                    type="text"
                    className="w-full mb-2 text-3xl md:text-4xl border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-2"
                    placeholder="Institute Name"
                    onBlur={(e) => setInstituteName(e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2 items-center mx-auto">
                <input
                    type="text"
                    className="w-full mb-2 text-3xl md:text-4xl border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-2"
                    placeholder="Subject/Exam name"
                    onBlur={(e) => setExamTitle(e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2 items-center mx-auto">
                <input
                    type="text"
                    className="w-full mb-2 text-xl md:text-2xl border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-2"
                    placeholder="Subject description"
                    onBlur={(e) => setExamDescription(e.target.value)}
                />
            </div>
            <div className="flex justify-between w-full md:w-1/2 mx-auto">
                <input
                    type="text"
                    className="w-1/2 text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200 mr-2 pl-2 py-2"
                    placeholder="Marks"
                    onBlur={(e) => setExamMarks(e.target.value)}
                />
                <input
                    type="text"
                    className="w-1/2 text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-2"
                    placeholder="Time"
                    onBlur={(e) => setExamTime(e.target.value)}
                />
            </div>
        </div>
    );
};

export default FormTitle;