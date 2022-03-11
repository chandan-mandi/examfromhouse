import axios from 'axios';
import _ from "lodash";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';
import FileShow from '../FileShow/FileShow';
import Answers from '../QuestionSection/Answers';
import MultipleChoiceAnswers from '../QuestionSection/MultipleChoiceAnswers';

const ViewResponse = () => {
    const { resId } = useParams();
    const [response, setResponse] = useState({});
    const [score, setScore] = useState("");
    const { search } = useLocation();
    console.log('quq', new URLSearchParams(search).get('teacher'));
    const isTeacher = new URLSearchParams(search).get('teacher');
    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/responses/singleSet/${resId}`)
            .then(data => {
                setResponse(data.data.responses)
                setScore(data.data.userScore)
            })
    }, [resId]);
    const handleUpdateMark = (value, index) => {
        const loading = toast.loading("Please wait updating mark...")
        console.log(value, "index", index);
        const questionMark = parseInt(response.studentAns[index].mark)
        if (value > questionMark) {
            return toast.error(`please enter Mark below ${questionMark + 1}`, {
                id: loading
            })
        }
        const studentAnswers = _.cloneDeep(response.studentAns)
        studentAnswers[index].obtainMark = value;
        axios.put(`https://examfromhouse.herokuapp.com/markupdate/${resId}`, studentAnswers)
            .then(data => {
                if (data.data.modifiedCount === 1) {
                    toast.success("updated", {
                        id: loading,
                    })
                }
            })
        return studentAnswers;
    }
    console.log('rsdi', response);
    return (
        <div className="py-4 flex flex-col items-center justify-center">
            <div className="bg-white text-left w-full md:w-2/3 rounded border-t-8 border-b-8 border-blue-800 p-7 filter drop-shadow-lg">
                <div className="flex flex-col w-full md:w-1/2 items-center mx-auto">
                    <h2 className="text-2xl font-medium">{response.examTitle}</h2>
                    <p>{response.examDescription}</p>
                    <p>Marks: {score}/{response.totalMarks}</p>
                    <p>Student Name: {response.studentName}</p>
                    <p>Student Email: {response.studentEmail}</p>
                </div>
            </div>
            <div className="mt-5 py-8 w-full md:w-2/3">
                <div className="mx-4 md:mx-0">
                    {
                        response?.studentAns?.map((res, index) =>
                            <div className="w-full ">
                                <div className="flex justify-between">
                                    <p className='capitalize text-xl font-semibold'>{res.title}</p>
                                    <p>{res.mark}</p>
                                </div>
                                {
                                    res?.question === "multi-choice" && <MultipleChoiceAnswers options={res.options} />
                                }
                                {
                                    res?.question === "check-box" && <Answers options={res.options} />
                                }

                                {
                                    res.question === "paragraph" && <>
                                        <textarea
                                            name=""
                                            id=""
                                            rows="4"
                                            className="w-full text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 mb-2 pl-2"
                                            placeholder="Answer"
                                            defaultValue={res.stdParagraphAns}
                                            readOnly
                                        ></textarea>
                                        {isTeacher === "true" &&
                                            <div className='pb-4'>
                                                <span className='text-base font-semibold capitalize w-full my-2 py-1 px-2 rounded text-teal-600 bg-green-500 last:mr-0 mr-1'>Marks Obtain</span>
                                                <input type="number" className='ml-2 border-2 w-12' onChange={(e) => handleUpdateMark(e.target.value, index)} defaultValue={res.obtainMark} />
                                            </div>
                                        }
                                    </>
                                }
                                {
                                    res.question === "file-upload" && <>
                                        {res.stdFileAns ?
                                            <>
                                                <FileShow fileId={res.stdFileAns} />
                                                {isTeacher === "true" &&
                                                    <div className='pb-4'>
                                                        <span className='text-base font-semibold capitalize w-full my-2 py-1 px-2 rounded text-teal-600 bg-green-500 last:mr-0 mr-1'>Marks Obtain</span>
                                                        <input type="number" className='ml-2 border-2 w-12' onChange={(e) => handleUpdateMark(e.target.value, index)} defaultValue={res.obtainMark} />
                                                    </div>
                                                }
                                            </>
                                            :
                                            <div>
                                                <h2>No File Uploaded</h2>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewResponse;