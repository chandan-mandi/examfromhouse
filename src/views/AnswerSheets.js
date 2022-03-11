import React from 'react';
import AnswersTable from '../components/Cards/AnswersTable';

const AnswerSheets = () => {
    return (
        <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <AnswersTable />
          </div>
          <div className="w-full mb-12 px-4">
            <AnswersTable color="dark" />
          </div>
        </div>
      </>
    );
};

export default AnswerSheets;