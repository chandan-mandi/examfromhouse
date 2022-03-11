import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import ShowMarks from '../AllResponses/ShowMarks';

const MyResults = () => {
    const {user} = useAuth();
    const [myAnswers, setMyAnswers] = useState([]);
    const [loading, setLoading]= useState(true);
    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/responses/${user.email}`)
        .then(res => {
            setMyAnswers(res.data)
            setLoading(false)
        }) 
        .catch(error => console.log(error.message))
    },[user.email])
    console.log(myAnswers);
    return (
        <div className="py-4 flex flex-col items-center justify-center">
            <div className="flex flex-col w-full md:w-2/3">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="border-b bg-blue-100">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Exam Title
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Exam Description
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Marks
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { loading ? <div>loading..</div> :
                                        myAnswers.map((res, index) => <ShowMarks key={res._id} res={res} index={index} myRes teacher={false}/>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyResults;