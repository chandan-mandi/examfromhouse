import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ReuseQuestion = () => {
    const { questionId } = useParams();
    const [questions, setQuestions] = useState({});
    const [instituteName, setInstituteName] = useState(`${questions?.instituteName}`);
    const [examTitle, setExamTitle] = useState(`${questions.examTitle}`);
    const [examDescription, setExamDescription] = useState(`${questions.examDescription}`);
    const [examTime, setExamTime] = useState(`${questions.examTime}`);
    const [startingTime, setStartingTime] = useState(`${questions.startingTime}`);
    const [endingTime, setEndingTime] = useState(`${questions.endingTime}`);
    const [date, setDate] = useState(`${questions.date}`);
    const handleSubmit = e => {
        const details = { instituteName, examTitle, examTime, examDescription, startingTime, endingTime, date };
        const url = `https://examfromhouse.herokuapp.com/questionSet/${questionId}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Updated Successfully');
                }
            })
        e.preventDefault();
    };

    useEffect(() => {
        const url = `https://examfromhouse.herokuapp.com/questionSet/${questionId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setQuestions(data))
    }, [questionId])

    return (
        <div>
            <Toaster />
            <div className="container px-5 py-8 mx-auto">
                <div className="flex flex-col text-center w-full mb-12 items-center">
                    <p className="text-4xl title-font mb-4 font-bold text-purple-900">Reuse Questions</p>
                    <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="name1" className="font-bold">Institute Name</label>
                            <input
                                type="text"
                                name=""
                                id="name1"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                defaultValue={questions.instituteName}
                                onBlur={(e) => setInstituteName(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="name2" className="font-bold">Exam Title</label>
                            <input
                                type="text"
                                name=""
                                id="name2"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                defaultValue={questions.examTitle}
                                onBlur={(e) => setExamTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="description" className="font-bold">Exam Description</label>
                            <input
                                type="text"
                                name=""
                                id="description"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                defaultValue={questions.examDescription}
                                onBlur={(e) => setExamDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="time" className="font-bold">Exam Time</label>
                            <input
                                type="text"
                                name=""
                                id="time"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                defaultValue={questions.examTime}
                                onBlur={(e) => setExamTime(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="date" className="font-bold">Date</label>
                            <input
                                type="date"
                                name=""
                                id="date"
                                className="text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200"
                                defaultValue={questions.date}
                                onBlur={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="startTime" className="font-bold">Starting Time</label>
                            <input
                                type="time"
                                id="startTime"
                                className="text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200"
                                defaultValue={questions.startingTime}
                                onBlur={(e) => setStartingTime(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between w-full md:w-2/5 mb-3">
                            <label htmlFor="endTime" className="font-bold">Ending Time</label>
                            <input
                                type="time"
                                id="endTime"
                                className="text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200"
                                defaultValue={questions.endingTime}
                                onBlur={(e) => setEndingTime(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-2">Change</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReuseQuestion;