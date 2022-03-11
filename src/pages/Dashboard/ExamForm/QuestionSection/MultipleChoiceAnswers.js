import React, { Fragment } from 'react';
import classes from "../../../../styles/Answers.module.css";
import AnswerRadiobox from './AnswerRadiobox';

const MultipleChoiceAnswers = ({ options = [], input, handleAnswerChange}) => {
    return (
        <div className={classes.answers}>
            {options.map((option, index) => (
                <Fragment key={index}>
                    {input ? (
                        <AnswerRadiobox
                            key={index}
                            className={classes.answer}
                            selectBox={classes.correct} 
                            text={option.title}
                            value={index}
                            checked={option.checked}
                            onChange={(e) => handleAnswerChange(e, index)}
                        />
                    ) : (
                        <AnswerRadiobox
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
    );
};

export default MultipleChoiceAnswers;