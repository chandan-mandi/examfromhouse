import React, { Fragment } from 'react';
import classes from "../../../../styles/Answers.module.css";
import "./Answer.css";
import AnswerCheckbox from './AnswerCheckbox';

const Answers = ({ options = [], input, handleAnswerChange, toogleActive, selectedAnswer }) => {

    return (
        <>
            <span className="text-base mb-8 font-semibold capitalize w-full py-1 px-2 rounded text-teal-600 bg-green-500 last:mr-0 mr-1">
                Question can have multiple answers
            </span>
            <div className={classes.answers}>
                {options?.map((option, index) => (
                    <Fragment key={index}>
                        {input ? (
                            <AnswerCheckbox
                                key={index}
                                className={classes.answer}
                                selectBox={classes.correct}
                                text={option.title}
                                value={index}
                                checked={option.checked}
                                onChange={(e) => handleAnswerChange(e, index)}
                            />
                        ) : (
                            <AnswerCheckbox
                                key={index}
                                className={`${classes.answer} ${option.correct
                                    ? classes.correct
                                    : option.checked
                                        ? classes.wrong
                                        : null
                                    } `}
                                text={option.title}
                                defaultChecked={option.checked}
                                disabled
                            />
                        )}
                    </Fragment>
                ))}
            </div>
        </>
    );
};

export default Answers;