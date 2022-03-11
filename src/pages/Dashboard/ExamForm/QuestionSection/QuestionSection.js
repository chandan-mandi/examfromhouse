import axios from 'axios';
import _ from "lodash";
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../../../hooks/useAuth';
import "./Answer.css";
import Answers from './Answers';
import FileAnswer from './FileAnswer';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import ParagraphAnswer from './ParagraphAnswer';
import ProgressBar from './ProgressBar';

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach((question) => {
                if (question.options) {
                    question.options.forEach((option) => {
                        option.checked = false;
                    });
                }
            });
            return action.value;
        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked =
                action.value;

            return questions;
        case "radioAnswer":
            const Radioquestions = _.cloneDeep(state);
            Radioquestions[action.questionID].options.forEach((option) => {
                option.checked = false;
                Radioquestions[action.questionID].options[action.optionIndex].checked =
                    action.value;
            });

            return Radioquestions;
        case "fileAnswer":
            const filequestions = _.cloneDeep(state);
            filequestions[action.questionID].stdFileAns =
                action.value;

            return filequestions;
        case "paragraphAnswer":
            const paragraphquestions = _.cloneDeep(state);
            paragraphquestions[action.questionID].stdParagraphAns =
                action.value;

            return paragraphquestions;
        default:
            return state;
    }
};
const QuestionSection = ({ questionSet, questions, loading, quesId }) => {
    console.log(questions)
    const { user } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [qna, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();


    console.log('qna', qna);
    const onReloadNeeded = useCallback(async () => {
        const questionCollection = await questions;
        dispatch({
            type: "questions",
            value: questionCollection,
        });
    }, [questions]);
    useEffect(() => {
        onReloadNeeded()
    }, [onReloadNeeded]);

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    }
    const handleAnswerToggle = (e, index) => {
        dispatch({
            type: "radioAnswer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    }
    const handleParagraphAns = (e) => {
        dispatch({
            type: "paragraphAnswer",
            questionID: currentQuestion,
            value: e.target.value,
        });
    }
    const handleFileAnswer = (file) => {
        const loading = toast.loading("File Uploading Please wait...")
        console.log("upload file", file);
        const formData = new FormData();
        formData.append("fileName", file.name)
        formData.append("type", file.type)
        formData.append("file", file)
        fetch('https://examfromhouse.herokuapp.com/fileupload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                toast.dismiss(loading);
                if (result.insertedId) {
                    console.log('file uplaodeded');
                    dispatch({
                        type: "fileAnswer",
                        questionID: currentQuestion,
                        value: result.insertedId,
                    });
                    return swal("Successfully Uploaded", "Your new service has been successfully added.", "success");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent + 1)
        }
    }
    const prevQuestion = () => {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent - 1)
        }
    }
    const submit = async () => {
        const loading = toast.loading("Please wait...")
        const answerInfo = {
            studentName: user.displayName,
            studentEmail: user.email,
            studentAns: qna,
            examTitle: questionSet.examTitle,
            examDescription: questionSet.examDescription,
            quesId: quesId, 
            examMarks: questionSet.examMarks
        }

        await axios.post('https://examfromhouse.herokuapp.com/responses', answerInfo)
            .then(res => {
                toast.dismiss(loading);
                if (res.data) {
                    return swal("Successfully Uploaded", "Your new service has been successfully added.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            });
        history.push({
            pathname: `/result/${quesId}`,
            state: {
                qna,
            }
        });
    }
    const submitQuiz = (currentQuestion + 1) === questions.length
    // console.log('current question', qna[currentQuestion]?.question);
    return (
        <>
            {!loading && qna && qna.length > 0 && (
                <>
                    <div className="question-title">
                        <h1
                            onCopy={(e) => {
                                e.preventDefault()
                                return false;
                            }}
                        >Question Title : {qna[currentQuestion].title}</h1>
                        <h4>Question can have multiple answers</h4>
                    </div>
                    {
                        qna[currentQuestion]?.question === "check-box" &&

                        <Answers
                            input
                            options={qna[currentQuestion]?.options}
                            handleAnswerChange={handleAnswerChange}
                        />
                    }
                    {
                        qna[currentQuestion]?.question === "multi-choice" &&

                        <MultipleChoiceAnswers
                            input
                            options={qna[currentQuestion]?.options}
                            handleAnswerChange={handleAnswerToggle}
                        />
                    }
                    {
                        qna[currentQuestion]?.question === "paragraph" &&

                        <ParagraphAnswer
                            input
                            stdAns={qna[currentQuestion]?.stdParagraphAns}
                            handleParagraphAns={handleParagraphAns}
                        />
                    }
                    {
                        qna[currentQuestion]?.question === "file-upload" &&

                        <FileAnswer
                            input
                            fileId={qna[currentQuestion]?.stdFileAns}
                            handleFileAnswer={handleFileAnswer}
                        />
                    }
                    <ProgressBar
                        next={nextQuestion}
                        prev={prevQuestion}
                        submit={submit}
                        submitQuiz={submitQuiz}
                    />
                    <Toaster />
                </>
            )}
        </>
    );
};

export default QuestionSection;

