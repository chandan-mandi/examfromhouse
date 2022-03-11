import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShowMarks = ({res, index , myRes, teacher}) => {
    
    const [loading, setLoading] = useState(true);
    const [questionSet, setQuestionSet] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [response, setResponse] = useState({});
    const [score, setScore] = useState("");

    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/questionSet/${res.quesId}`)
            .then(res => {
                setQuestionSet(res.data);
                setQuestions(res.data.questions)
                setLoading(false);
            })
            .catch(error => {

            })
    }, [res.quesId]);

    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/responses/singleSet/${res._id}`)
            .then(data => {
                setResponse(data.data.responses)
                setScore(data.data.userScore)
            })
    }, [res._id]);
    /* function calculate() {
        let score = 0;
        let totalMarks = 0;
        questions.forEach((question, index1) => {
            let correctIndexes = [],
                checkedIndexes = [];
            if(question.options){
            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2)
                if (res.studentAns[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });
            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + parseInt(question.mark);
            }
        }
        totalMarks = totalMarks + parseInt(question.mark)
        })
        return {
            score,
            totalMarks
        }
    }
    const userScore = calculate(); */
    return (
        <>
            <tr
                className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{myRes ? `${index + 1}`: 1}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {myRes ? `${res.examTitle}`: `${res.studentName}`} 
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {myRes ? `${res.examDescription}`: `${res.studentEmail}`} 
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {score}/{response.totalMarks}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link  to={`/viewResponse/${res._id}?teacher=${teacher}`} className="bg-pink-500 hover:bg-pink-700 text-white text-center py-2 px-4 rounded-full">View</Link>
                </td>
            </tr>
        </>
    );
};

export default ShowMarks;