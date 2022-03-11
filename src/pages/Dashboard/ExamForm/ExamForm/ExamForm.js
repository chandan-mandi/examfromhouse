import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import AlertTimer from '../AlertTimer/AlertTimer';
import QuestionSection from '../QuestionSection/QuestionSection';

const ExamForm = () => {
    const { quesCode } = useParams();
    const { user } = useAuth();
    const [studentName, setStudentName] = useState(`${user.displayName}`);
    const [studentEmail, setStudentEmail] = useState(`${user.email}`);
    const [questionSet, setQuestionSet] = useState([]);
    const [multipleAnswer, setMultipleAnswer] = useState('');
    const [checkboxAnswer, setCheckboxAnswer] = useState([]);
    const [paragraphAnswer, setParagraphAnswer] = useState('');
    const today = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm');
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/questionSet/${quesCode}`)
            .then(res => {
                setQuestionSet(res.data);
                setQuestions(res.data.questions)
                setLoading(false);
            })
            .catch(error => toast.error(error.message))
    }, [quesCode]);
    console.log("ques", questions);
    const handleCheckbox = (e) => {
        const newCheckboxAnswer = e.target.value;
        const ans = [...checkboxAnswer, newCheckboxAnswer]
        setCheckboxAnswer(ans);
    }

    const handleSubmit = e => {
        const newResponse = { studentName, studentEmail, questionSet: questionSet.questions, multipleAnswer, checkboxAnswer, paragraphAnswer };
        fetch('https://examfromhouse.herokuapp.com/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResponse)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                }
            })
        e.preventDefault();
    }

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
    }
    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, [])
    return (
        <div className="py-4 flex flex-col items-center justify-center">
            <div className="bg-white text-left w-full md:w-2/3 rounded border-t-8 border-b-8 border-blue-800 p-7 filter drop-shadow-lg">
                {
                    questionSet.startingTime <= currentTime && questionSet.endingTime >= currentTime &&
                    <div>
                        <AlertTimer endingTime={questionSet.endingTime} />
                    </div>
                }
                <div className="flex flex-col w-full md:w-1/2 items-center mx-auto">
                    <p className="text-3xl">{questionSet?.instituteName}</p>
                    <p className="text-lg">{questionSet?.examTitle}</p>
                    <p>{questionSet?.examDescription}</p>
                    <div className="flex justify-between w-full">
                        <p>Marks: {questionSet?.examMarks}</p>
                        <p>Time: {questionSet?.examTime}</p>
                    </div>
                    <div id="google_translate_element"></div>
                </div>
            </div>

            {
                questionSet?.date === today && currentTime >= questionSet.startingTime && currentTime <= questionSet.endingTime &&
                <div className="mt-5 w-full md:w-2/3">
                    {
                        loading ?
                            <div className="text-center my-5">
                                <h2 className="text-purple-900 font-bold">Loading...</h2>
                            </div>
                            :
                            <QuestionSection
                                loading={loading}
                                quesId={quesCode}
                                questions={questions}
                                questionSet={questionSet} />
                    }
                </div>
            }

            {
                questionSet?.date < today || questionSet?.date > today || questionSet?.date === today && currentTime < questionSet.startingTime || currentTime > questionSet.endingTime ?
                    <div>
                        <p className="text-4xl mt-6">Exam Date: {questionSet.date}</p>
                        <p className="text-4xl mt-6">Exam Time: {questionSet.startingTime}</p>
                    </div>
                    :
                    ''
            }
        </div >
    );
};

export default ExamForm;