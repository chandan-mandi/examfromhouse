import React from 'react';

const AnswerRadiobox = ({ className, text, selectBox, ...rest }) => {
    const { checked } = { ...rest };
    console.log('is this check', checked);
    return (
        <label
            onCopy={(e) => {
                e.preventDefault()
                return false;
            }}
            className={`${text.endsWith(".png") || text.endsWith(".jpg") ? `setLabelHeight ${className}` : className} ${checked === true && selectBox}`}>
            <input type="radio" name='ansRadio' {...rest} className={`${checked === true && selectBox}`} />
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

export default AnswerRadiobox;