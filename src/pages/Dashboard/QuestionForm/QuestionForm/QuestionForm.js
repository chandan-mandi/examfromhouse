import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import useAuth from '../../../../hooks/useAuth';
import CheckBox from '../CheckBox/CheckBox';
import FileUpload from '../FileUpload/FileUpload';
import FormTitle from '../FormTitle/FormTitle';
import MultiChoice from '../MultiChoice/MultiChoice';
import Paragraph from '../Paragraph/Paragraph';
import QuestionShow from '../QuestionShow/QuestionShow';

const QuestionForm = () => {
    const { user } = useAuth();
    const [examTitle, setExamTitle] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [examDescription, setExamDescription] = useState('');
    const [examMarks, setExamMarks] = useState('');
    const [examTime, setExamTime] = useState('');
    const [startingTime, setStartingTime] = useState('');
    const [endingTime, setEndingTime] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("multi-choice");
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionTitleImg, setQuestionTitleImg] = useState('');
    const [option1, setOption1] = useState('');
    const [option1Img, setOption1Img] = useState('');
    const [option2, setOption2] = useState('');
    const [option2Img, setOption2Img] = useState('');
    const [option3, setOption3] = useState('');
    const [option3Img, setOption3Img] = useState('');
    const [option4, setOption4] = useState('');
    const [option4Img, setOption4Img] = useState('');
    const [option5, setOption5] = useState('');
    const [option5Img, setOption5Img] = useState('');
    const [answer, setAnswer] = useState('');
    const [mark, setMark] = useState(0);
    const [correctOption1, setCorrectOption1] = useState(false);
    const [correctOption2, setCorrectOption2] = useState(false);
    const [correctOption3, setCorrectOption3] = useState(false);
    const [correctOption4, setCorrectOption4] = useState(false);
    const [correctOption5, setCorrectOption5] = useState(false);

    const handleMultipleChange = (e) => {
        setAnswer(e.target.value);
    }
    const handleCheckboxChange = (e) => {
        const newAnswer = e.target.value;
        const ans = [...answer, newAnswer]
        setAnswer(ans);
    }

    // console.log("question pattern", correctAnswer);
    const handleAddQuestion = async e => {
        e.preventDefault();
        const loading = toast.loading('Uploading...Please wait!')
        const questionData = () => {
            let quesData = {};
            if (question === "multi-choice" || question === "check-box") {
                quesData = {
                    email: user.email,
                    title: questionTitle,
                    options: [
                        {
                            title: `${option1Img ? option1Img : option1}`,
                            correct: correctOption1
                        },
                        {
                            title: option2,
                            correct: correctOption2
                        },
                        {
                            title: option3,
                            correct: correctOption3
                        },
                        {
                            title: option4,
                            correct: correctOption4
                        },
                        {
                            title: option5,
                            correct: correctOption5
                        }
                    ],
                    mark,
                    answer,
                    question
                }
            }
            if (question === "paragraph" || question === "file-upload") {
                quesData = {
                    email: user.email,
                    title: questionTitle,
                    mark,
                    answer,
                    question
                }
            }
            return quesData;
        }
        const finalQuestionData = questionData();
        console.log('perfect data', finalQuestionData);

        axios.post('https://examfromhouse.herokuapp.com/addQuestions', finalQuestionData)
            .then(res => {
                if (res.data.insertedId) {
                    window.location.reload();
                    toast.success('Your Question Successfully Added', {
                        id: loading,
                    });
                    // return toast.success("Successfully Added!", "Your car has been successfully added.", "success");
                }
            })
    }
    useEffect(() => {
        fetch(`https://examfromhouse.herokuapp.com/questions/${user.email}`)
            .then(res => res.json())
            .then(data => setQuestions(data))
    }, [user.email]);
    const handleUploadQuestion = () => {
        const email = user.email;
        const newQuestionSet = { email, examTitle, instituteName, examDescription, examMarks, examTime, questions: [...questions], date, endingTime, startingTime };
        fetch('https://examfromhouse.herokuapp.com/addQuestionSet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestionSet)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                }
            })
        fetch(`https://examfromhouse.herokuapp.com/questions/${user.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    window.location.reload();
                    setQuestions([]);
                }
            })
    }
    console.log('question set', questions);
    return (
        <div className="py-4 flex flex-col items-center justify-center">
            {/* Form Title */}
            <FormTitle
                setInstituteName={setInstituteName}
                setExamTitle={setExamTitle}
                setExamDescription={setExamDescription}
                setExamMarks={setExamMarks}
                setExamTime={setExamTime}
            />
            {/* Form body */}
            {questions.length > 0 && <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-2/3 mt-4">
                    <div className="flex justify-between items-center">
                        <label htmlFor="startTime">Starting Time</label>
                        <input
                            type="time"
                            id="startTime"
                            className="text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200"
                            onBlur={(e) => setStartingTime(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="endTime">Ending Time</label>
                        <input
                            type="time"
                            id="endTime"
                            className="text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200"
                            onBlur={(e) => setEndingTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/3">
                    <input
                        type="date"
                        name=""
                        id=""
                        className="text-base md:text-xl border rounded border-gray-200 focus:outline-none focus:border-gray-200"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </>
            }
            {questions.length > 0
                ?
                <>
                    {
                        questions.map(ques => <QuestionShow
                            key={ques._id}
                            ques={ques}
                        ></QuestionShow>)
                    }
                    <button onClick={handleUploadQuestion} className="text-xl my-5 bg-purple-700 text-white rounded-md px-5 py-2">Upload Question</button>
                </>
                :
                ''
            }
            <button onClick={() => setShow(true)} className={show ? "text-xl my-5 bg-purple-700 text-white rounded-md px-5 py-3 hidden" : "text-xl my-5 bg-purple-700 text-white rounded-md px-5 py-3 block"}>Add Question</button>
            <div id="questionTypes" className={show ? "my-5 text-xl grid grid-cols-2 md:grid-cols-4 gap-4 block" : "text-xl grid grid-cols-2 md:grid-cols-4 gap-4 hidden"}>
                <button onClick={() => setQuestion("multi-choice")} className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-3">Multiple Choice</button>
                <button onClick={() => setQuestion("check-box")} className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-3">Check Box</button>
                <button onClick={() => setQuestion("paragraph")} className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-3">Paragraph</button>
                <button onClick={() => setQuestion("file-upload")} className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-3">File Upload</button>
            </div>
            {
                show ?
                    <div className="w-full md:w-2/3 my-7 px-6 md:px-0">
                        {
                            question === "multi-choice" && <>
                                <MultiChoice
                                    setQuestionTitle={setQuestionTitle}
                                    setQuestionTitleImg={setQuestionTitleImg}
                                    questionTitleImg={questionTitleImg}
                                    setOption1={setOption1}
                                    setCorrectOption1={setCorrectOption1}
                                    setCorrectOption2={setCorrectOption2}
                                    setCorrectOption3={setCorrectOption3}
                                    setCorrectOption4={setCorrectOption4}
                                    setCorrectOption5={setCorrectOption5}

                                    setOption1Img={setOption1Img}
                                    option1Img={option1Img}
                                    setOption2={setOption2}
                                    setOption2Img={setOption2Img}
                                    option2Img={option2Img}
                                    setOption3={setOption3}
                                    setOption3Img={setOption3Img}
                                    option3Img={option3Img}
                                    setOption4={setOption4}
                                    setOption4Img={setOption4Img}
                                    option4Img={option4Img}
                                    setOption5={setOption5}
                                    setOption5Img={setOption5Img}
                                    option5Img={option5Img}
                                ></MultiChoice>
                                <div className="flex flex-wrap md:flex-row items-center mt-2">
                                    <label className="block pb-3 md:pb-0">
                                        <span className="text-gray-700">Correct Answer</span>
                                        <select className="mx-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2" onBlur={handleMultipleChange}>
                                            <option value={option1}>Option 1</option>
                                            <option value={option2}>Option 2</option>
                                            <option value={option3}>Option 3</option>
                                            <option value={option4}>Option 4</option>
                                            <option value={option5}>Option 5</option>
                                        </select>
                                    </label>
                                    <input
                                        className="border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 mr-2"
                                        type="text"
                                        placeholder="Mark"
                                        onBlur={(e) => setMark(e.target.value)}
                                    />
                                    <button onClick={handleAddQuestion} className="border border-gray-200 hover:bg-gray-100 p-2 rounded-full">Question Done</button>
                                </div>
                            </>
                        }
                        {
                            question === "check-box" && <>
                                <CheckBox
                                    setQuestionTitle={setQuestionTitle}
                                    setQuestionTitleImg={setQuestionTitleImg}
                                    questionTitleImg={questionTitleImg}
                                    setCorrectOption1={setCorrectOption1}
                                    setCorrectOption2={setCorrectOption2}
                                    setCorrectOption3={setCorrectOption3}
                                    setCorrectOption4={setCorrectOption4}
                                    setCorrectOption5={setCorrectOption5}
                                    setOption1={setOption1}
                                    setOption1Img={setOption1Img}
                                    option1Img={option1Img}
                                    setOption2={setOption2}
                                    setOption2Img={setOption2Img}
                                    option2Img={option2Img}
                                    setOption3={setOption3}
                                    setOption3Img={setOption3Img}
                                    option3Img={option3Img}
                                    setOption4={setOption4}
                                    setOption4Img={setOption4Img}
                                    option4Img={option4Img}
                                    setOption5={setOption5}
                                    setOption5Img={setOption5Img}
                                    option5Img={option5Img}
                                ></CheckBox>
                                <div className="flex flex-wrap md:flex-row items-center mt-2">
                                    {/* <label className="block pb-3 md:pb-0">
                                        <span className="text-gray-700">Correct Answer</span>
                                        <select className="mx-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2" onChange={handleCheckboxChange}>
                                            <option value={option1}>Option 1</option>
                                            <option value={option2}>Option 2</option>
                                            <option value={option3}>Option 3</option>
                                            <option value={option4}>Option 4</option>
                                            <option value={option5}>Option 5</option>
                                        </select>
                                    </label> */}
                                    <input
                                        className="border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 mr-2"
                                        type="text"
                                        placeholder="Mark"
                                        onBlur={(e) => setMark(e.target.value)}
                                    />
                                    <button onClick={handleAddQuestion} className="border border-gray-200 hover:bg-gray-100 p-2 rounded-full mr-4 md:mr-3">Question Done</button>
                                </div>
                            </>
                        }
                        {
                            question === "paragraph" && <>
                                <Paragraph
                                    setQuestionTitle={setQuestionTitle}
                                    setQuestionTitleImg={setQuestionTitleImg}
                                    questionTitleImg={questionTitleImg}
                                ></Paragraph>
                                <div className="flex mt-2">
                                    <input
                                        className="border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 mr-2"
                                        type="text"
                                        placeholder="Mark"
                                        onBlur={(e) => setMark(e.target.value)}
                                    />
                                    <button onClick={handleAddQuestion} className="border border-gray-200 hover:bg-gray-100 p-2 rounded-full mr-4 md:mr-3">Question Done</button>
                                </div>
                            </>
                        }
                        {
                            question === "file-upload" && <>
                                <FileUpload
                                    setQuestionTitle={setQuestionTitle}
                                    setQuestionTitleImg={setQuestionTitleImg}
                                    questionTitleImg={questionTitleImg}
                                ></FileUpload>
                                <div className="flex mt-2">
                                    <input
                                        className="border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 mr-2"
                                        type="text"
                                        placeholder="Mark"
                                        onBlur={(e) => setMark(e.target.value)}
                                    />
                                    <button onClick={handleAddQuestion} className="border border-gray-200 hover:bg-gray-100 p-2 rounded-full">Question Done</button>
                                </div>
                            </>
                        }
                    </div>
                    :
                    ''
            }
            <Toaster />
        </div >
    );
};

export default QuestionForm;