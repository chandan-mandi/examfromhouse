import React from 'react';
import QuestionCreate from '../components/Cards/QuestionCreate';

const CreateQuestions = () => {
    return (
        <>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
             <QuestionCreate />
          </div>
          <div className="w-full lg:w-4/12 px-4">
            {/* <CardProfile /> */}
          </div>
        </div>
      </>
    );
};

export default CreateQuestions;