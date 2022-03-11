import React from 'react';
import "./Answer.css";

const AnswerCheckbox = ({ className, text,selectBox, ...rest }) => {
    const {checked} = { ...rest };
    return (
                <label 
                onCopy={(e) => {
                    e.preventDefault()
                    return false;
                }}
                className={`${text.endsWith(".png") || text.endsWith(".jpg") ? `setLabelHeight ${className}` : className} ${checked === true && selectBox}`}>
                    <input type="checkbox" {...rest} className={`${checked === true && selectBox}`}/>
                    {
                        text.endsWith(".png") || text.endsWith(".jpg") ?
                            <div className="option-img">
                                <img src={text} alt="" />
                            </div>
                            :
                            <span>{text}</span>
                    }
                </label>
    );
};

export default AnswerCheckbox;