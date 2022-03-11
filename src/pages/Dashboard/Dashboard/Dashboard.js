import React, { useEffect, useState } from 'react';
import { HiOutlineViewList } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import img2 from '../../../images/exam.jpg';
import img1 from '../../../images/pexels-photo-356079.jpeg';
import resultImg from '../../../images/result.webp';
import img3 from '../../../images/Review-submission.jpg';

const Dashboard = () => {
    const { user } = useAuth();
    const [questionSet, setQuestionSet] = useState([]);
    useEffect(() => {
        fetch(`https://examfromhouse.herokuapp.com/myQuestionSet/${user.email}`)
            .then(res => res.json())
            .then(data => setQuestionSet(data))
    }, [user.email]);
    const handleDelete = id => {
        fetch(`https://examfromhouse.herokuapp.com/questionSet/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    window.location.reload();
                    const remaining = questionSet.filter(ques => ques._id !== id);
                    setQuestionSet(remaining);
                }
            })
    }
    return (
        <div className="bg-indigo-100 md:px-12 py-10">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                <Link to="/form" className="border border-transparent hover:border-purple-500 cursor-pointer">
                    <img src={img1} alt="" className="" />
                    <p className="font-bold">Create A Question</p>
                </Link>
                <Link to="/exam" className="border border-transparent hover:border-purple-500 cursor-pointer">
                    <img src={img2} alt="" className="" />
                    <p className="font-bold">Give A Exam</p>
                </Link>
                <Link to="/myResults" className="border border-transparent hover:border-purple-500 cursor-pointer">
                    <img src={resultImg} alt="" className="" />
                    <p className="font-bold">My Results</p>
                </Link>
                <Link to="/review" className="border border-transparent hover:border-purple-500 cursor-pointer">
                    <img src={img3} alt="" className="" />
                    <p className="font-bold">Write A Review</p>
                </Link>
                {
                    questionSet.map(ques => <div key={ques._id} className="border border-transparent hover:border-purple-500">
                        <div className="text-center bg-white h-full pb-3">
                            <div className="flex justify-around bg-pink-50 py-3">
                                <Link to={`/questionSet/${ques._id}`} className="cursor-pointer">{<HiOutlineViewList className="text-xl" />}</Link>
                                <button onClick={() => handleDelete(ques._id)}>{<ImCross className="text-red-700" />}</button>
                            </div>
                            <p className="font-bold">{ques.examTitle}</p>
                            <p>{ques.examDescription}</p>
                            <p>{ques.date}</p>
                            <p>{ques.examTime}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Dashboard;