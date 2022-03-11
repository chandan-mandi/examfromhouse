import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

const QuestionShow = (props) => {
    const { title, mark, options, _id, answer, question } = props.ques;
    const [questions, setQuestions] = useState([]);

    const handleDelete = id => {
        fetch(`https://examfromhouse.herokuapp.com/question/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    window.location.reload();
                    const remaining = questions.filter(ques => ques._id !== id);
                    setQuestions(remaining);
                }
            })
    }
    return (
        <div className="mt-5 w-full md:w-2/3">
            <div className="mx-4 md:mx-0 flex items-center justify-between">
                <div className="w-full">
                    <div className="flex justify-between">
                        <p>{title}</p>
                        <p>{mark}</p>
                    </div>
                    <form>
                        {
                            options?.map(quest => <>{
                                quest.title && <>
                                    <input
                                        type={question === "check-box" ? "checkbox" : "radio"}
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
                        answer &&
                        <>
                            <p>Answer: {answer}</p>
                        </>
                    }
                    {
                        question === "paragraph" && <>
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
                        question === "file-upload" && <>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="w-full text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 mb-2"
                            />
                        </>
                    }
                </div>
                <div className="ml-3">
                    <button onClick={() => handleDelete(_id)}>{<ImCross className="text-red-700" />}</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionShow;