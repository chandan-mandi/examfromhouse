import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const Review = () => {
    const {user} = useAuth();
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const handleSubmit = e => {
        const reviews = { review, name, role, img: user.photoURL };
        const url = `https://examfromhouse.herokuapp.com/reviews`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    e.target.reset();
                    toast.success('Review Added Successfully');
                }
            })
        e.preventDefault();
    };
    return (
        <div>
            <Toaster />
            <div className="container px-5 py-8 mx-auto">
                <div className="flex flex-col text-center w-full mb-12 items-center">
                    <p className="text-4xl title-font mb-4 font-bold text-purple-900">Write A Review</p>
                    <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center w-full md:w-3/5 mb-3">
                            <label htmlFor="full-name" className="font-bold">Full Name</label>
                            <input
                                type="text"
                                name=""
                                id="full-name"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                placeholder="Your Full Name"
                                onBlur={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center w-full md:w-3/5 mb-3">
                            <label htmlFor="review" className="font-bold">Review</label>
                            <input
                                type="text"
                                name=""
                                id="review"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                placeholder="Write The Review Here"
                                onBlur={(e) => setReview(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center w-full md:w-3/5 mb-3">
                            <label htmlFor="role" className="font-bold">Role</label>
                            <input
                                type="text"
                                name=""
                                id="role"
                                className="text-base w-1/2 border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2 py-1"
                                placeholder="Your Role"
                                onBlur={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="text-xl bg-pink-200 text-purple-900 rounded-md px-5 py-2">Add Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;