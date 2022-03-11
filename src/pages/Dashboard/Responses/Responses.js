import axios from 'axios';
import _ from "lodash";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useHistory, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Responses = () => {
    const { id } = useParams();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [questionSet, setQuestionSet] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [userQnaSet, setUserQnaSet] = useState([]);
    // const [qna, setUserqna] = useState([]); // user Answer data from databas
    const { location } = useHistory();
    const { state } = location;
    const { qna } = state; // user answer data from direct state
    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/questionSet/${id}`)
            .then(res => {
                setQuestionSet(res.data);
                setQuestions(res.data.questions)
                setLoading(false);
            })
            .catch(error => toast.error(error.message))
    }, [id]);
    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/responses/${id}`)
            .then(res => {
                setUserQnaSet(res.data);
                // setUserqna(res.data.studentAns) // user Answer data from database 
                setLoading(false);
            })
            .catch(error => toast.error(error.message))
    }, [id]);

    console.log("qna from result", userQnaSet);
    function calculate() {
        let score = 0;
        let totalMarks = 0;
        questions.forEach((question, index1) => {
            let correctIndexes = [],
                checkedIndexes = [];
            if(question.options){
            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2)
                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });
            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + parseInt(question.mark);
            }
            totalMarks = totalMarks + parseInt(question.mark)
        }
        })
        return {
            score,
            totalMarks
        }
    }
    const userScore = calculate();
    return (
        <div className="px-5 py-8">
            {loading && <div className="text-purple-900 font-bold">Loading.....</div>}
            {questions && questions.length && (
                <div className="flex flex-wrap justify-center m-4">
                    <div className="p-4 lg:w-1/2 w-full">
                        <div className="flex flex-col border-2 items-center justify-center rounded-lg border-gray-200 border-opacity-50 p-8 bg-gradient-to-t from-purple-700 via-purple-600 to-purple-700">
                            <div>
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                                    alt=""
                                />
                            </div>
                            <div className="text-center text-white font-medium">
                                <p className="mt-2 text-xl">{user.displayName}</p>
                                <h2 className="leading-relaxed my-2">Examination Result</h2>
                                <h2 className="title-font text-2xl mb-5">Your score {userScore.score} out of {userScore.totalMarks}</h2>
                                <p>Score of multiple choice and checkbox</p>
                                <Link to="/dashboard" className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-2 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none">Back to Dashboard</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Responses;