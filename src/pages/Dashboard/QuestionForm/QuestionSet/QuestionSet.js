import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const QuestionSet = () => {
    const { quesId } = useParams();
    const [questionSet, setQuestionSet] = useState([]);
    useEffect(() => {
        fetch(`https://examfromhouse.herokuapp.com/questionSet/${quesId}`)
            .then(res => res.json())
            .then(data => setQuestionSet(data))
    }, [quesId]);
    return (
        <div className="py-4 flex flex-col items-center justify-center">
            <div className="bg-white text-left w-full md:w-2/3 rounded border-t-8 border-b-8 border-blue-800 p-7 filter drop-shadow-lg">
                <div className="flex flex-col w-full md:w-1/2 items-center mx-auto">
                    <p className="text-3xl">{questionSet?.instituteName}</p>
                    <p className="text-lg">{questionSet?.examTitle}</p>
                    <p>{questionSet?.examDescription}</p>
                    <div className="flex justify-between w-full">
                        <p>Marks: {questionSet?.examMarks}</p>
                        <p>Time: {questionSet?.examTime}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 w-full md:w-2/3">
                <div className="mx-4 md:mx-0">
                    {
                        questionSet?.questions?.map(ques => <div className="w-full">
                            <div className="flex justify-between">
                                <p>{ques.title}</p>
                                <p>{ques.mark}</p>
                            </div>
                            <form>
                                {
                                    ques?.options?.map(quest => <>{
                                        quest.title && <>
                                            <input
                                                type={ques.question === "check-box" ? "checkbox" : "radio"}
                                                name=""
                                                className="mr-2"
                                                id="option1"
                                                value={quest.title}
                                            />
                                            <label htmlFor="option1">{quest.title}</label><br />
                                        </>
                                    }
                                    </>)
                                }
                            </form>
                            {
                                ques.question === "paragraph" && <>
                                    <textarea
                                        name=""
                                        id=""
                                        rows="4"
                                        className="w-full text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 mb-2 pl-2"
                                        placeholder="Answer"
                                    ></textarea>
                                </>
                            }
                            {
                                ques.question === "file-upload" && <>
                                    <input
                                        type="file"
                                        name=""
                                        id=""
                                        className="w-full text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 mb-2"
                                    />
                                </>
                            }
                        </div>)
                    }
                </div>
            </div>
            <p>Question code: {questionSet?._id}</p>
            <Link to={`/reuseQuestion/${questionSet._id}`}>
                <button className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-2 my-4">Reuse Question set</button>
            </Link>
        </div >
    );
};

export default QuestionSet;