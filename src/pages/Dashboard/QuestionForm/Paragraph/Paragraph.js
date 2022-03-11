import React from 'react';
import useSingleImageUpload from '../../../../hooks/useSingleImageUpload';
import { BiImageAdd, BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { GrPowerReset } from 'react-icons/gr';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Paragraph = ({ setQuestionTitle, setQuestionTitleImg, questionTitleImg }) => {
    const QuestionTitleImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setQuestionTitleImg(res))
    }
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center">
                        <input
                            type="text"
                            name=""
                            id=""
                            className="w-full text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                            placeholder="Question"
                            defaultValue={transcript ? transcript : ''}
                            onBlur={(e) => setQuestionTitle(e.target.value)}
                        />
                        {/* image upload section  */}
                        <div>
                            <input
                                type="file"
                                id="option1Img"
                                placeholder="Upload Photo"
                                style={{ display: "none" }}
                                onChange={(e) => QuestionTitleImgUpload(e)}
                            />
                            <label htmlFor="option1Img">
                                <div className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-3 img-upload-btn">{<BiImageAdd className="text-2xl" />}</div>
                            </label>
                        </div>

                        <div onClick={SpeechRecognition.startListening} className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-2 cursor-pointer">
                            {<BiMicrophone className={listening ? "text-red-700 text-2xl" : "text-2xl"} />}
                        </div>
                        <div onClick={SpeechRecognition.stopListening} className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-2 cursor-pointer">
                            {<BiMicrophoneOff className="text-2xl" />}
                        </div>
                        {
                            transcript &&
                            <div onClick={resetTranscript} className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-2 cursor-pointer">
                                {<GrPowerReset className="text-2xl" />}
                            </div>
                        }
                    </div>
                </div>
                {/* image showing */}
                {
                    questionTitleImg &&
                    <div className="w-1/6">
                        <div>
                            <img className={questionTitleImg && "w-12 h-12 rounded-full mx-auto"} src={questionTitleImg} alt='' />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Paragraph;