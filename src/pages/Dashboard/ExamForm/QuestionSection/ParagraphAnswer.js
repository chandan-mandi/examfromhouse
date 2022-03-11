import React from 'react';
import classes from "../../../../styles/Answers.module.css";

const ParagraphAnswer = ({ input, handleParagraphAns,stdAns }) => {
    return (
        <div className={classes.answers}>
            {input && (
                <div class="mt-1">
                    <textarea id="about" name="about" rows="6" class="md:text-base p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-gray-500 rounded-md" placeholder="Write here..."  
                    defaultValue={stdAns}
                    onChange={(e) => handleParagraphAns(e)}
                    ></textarea>
                </div>
            )}
        </div>
    );
};

export default ParagraphAnswer;