import React from 'react';
import useSingleImageUpload from '../../../../hooks/useSingleImageUpload';
import { BiImageAdd, BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { GrPowerReset } from 'react-icons/gr';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const CheckBox = ({ setOption1,
    setCorrectOption1,
    setCorrectOption2,
    setCorrectOption3,
    setCorrectOption4,
    setCorrectOption5, setOption1Img, option1Img, setOption2, setOption2Img, option2Img, setOption3, setOption3Img, option3Img, setOption4, setOption4Img, option4Img, setOption5, setOption5Img, option5Img, setQuestionTitle, setQuestionTitleImg, questionTitleImg }) => {
    const QuestionTitleImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setQuestionTitleImg(res))
    }
    const Option1ImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setOption1Img(res))
    }
    const Option2ImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setOption2Img(res))
    }
    const Option3ImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setOption3Img(res))
    }
    const Option4ImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setOption4Img(res))
    }
    const Option5ImgUpload = (e) => {
        useSingleImageUpload(e.target.files[0])
            .then(res => setOption5Img(res))
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
                                id="questionTitleImg"
                                placeholder="Upload Photo"
                                style={{ display: "none" }}
                                onChange={(e) => QuestionTitleImgUpload(e)}
                            />
                            <label htmlFor="questionTitleImg">
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

            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            id="option1"
                            onChange={(e) => setCorrectOption1(e.target.checked)}
                        />
                        <input
                            type="text"
                            name=""
                            htmlFor="option1"
                            className="w-full ml-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                            placeholder="Option 1"
                            onBlur={(e) => setOption1(e.target.value)}
                        />
                        {/* image upload section  */}
                        <div>
                            <input
                                type="file"
                                id="option1Img"
                                placeholder="Upload Photo"
                                style={{ display: "none" }}
                                onChange={(e) => Option1ImgUpload(e)}
                            />
                            <label htmlFor="option1Img">
                                <div className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-3 img-upload-btn">{<BiImageAdd className="text-2xl" />}</div>
                            </label>
                        </div>
                    </div>
                </div>
                {
                    option1Img &&
                    <div className="w-1/6">
                        {/* image showing */}
                        <div>
                            <img className={option1Img && "w-12 h-12 rounded-full mx-auto"} src={option1Img} alt='' />
                            {/* <img src={option1Img} alt="" /> */}
                        </div>
                    </div>
                }
            </div>
            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            id="option2"
                            onChange={(e) => setCorrectOption2(e.target.checked)}
                        />
                        <input
                            type="text"
                            name=""
                            htmlFor="option2"
                            className="w-full ml-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                            placeholder="Option 2"
                            onBlur={(e) => setOption2(e.target.value)}
                        />
                        {/* image upload section  */}
                        <div>
                            <input
                                type="file"
                                id="option2Img"
                                style={{ display: "none" }}
                                onChange={(e) => Option2ImgUpload(e)}
                            />
                            <label htmlFor="option2Img">
                                <div className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-3 img-upload-btn">{<BiImageAdd className="text-2xl" />}</div>
                            </label>
                        </div>
                    </div>
                </div>
                {
                    option2Img &&
                    <div className="w-1/6">
                        {/* image showing */}
                        <div>
                            <img className={option2Img && "w-12 h-12 rounded-full mx-auto"} src={option2Img} alt='' />
                            {/* <img src={option1Img} alt="" /> */}
                        </div>
                    </div>
                }
            </div>
            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            id="option3"
                            onChange={(e) => setCorrectOption3(e.target.checked)}
                        />
                        <input
                            type="text"
                            name=""
                            htmlFor="option3"
                            className="w-full ml-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                            placeholder="Option 3"
                            onBlur={(e) => setOption3(e.target.value)}
                        />
                        {/* image upload section  */}
                        <div>
                            <input
                                type="file"
                                id="option3Img"
                                style={{ display: "none" }}
                                onChange={(e) => Option3ImgUpload(e)}
                            />
                            <label htmlFor="option3Img">
                                <div className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-3 img-upload-btn">{<BiImageAdd className="text-2xl" />}</div>
                            </label>
                        </div>
                    </div>
                </div>
                {
                    option3Img &&
                    <div className="w-1/6">
                        {/* image showing */}
                        <div>
                            <img className={option3Img && "w-12 h-12 rounded-full mx-auto"} src={option3Img} alt='' />
                            {/* <img src={option1Img} alt="" /> */}
                        </div>
                    </div>
                }
            </div>
            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            id="option4"
                            onChange={(e) => setCorrectOption4(e.target.checked)}
                        />
                        <input
                            type="text"
                            name=""
                            htmlFor="option4"
                            className="w-full ml-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                            placeholder="Option 4"
                            onBlur={(e) => setOption4(e.target.value)}
                        />
                        {/* image upload section  */}
                        <div>
                            <input
                                type="file"
                                id="option4Img"
                                style={{ display: "none" }}
                                onChange={(e) => Option4ImgUpload(e)}
                            />
                            <label htmlFor="option4Img">
                                <div className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-3 img-upload-btn">{<BiImageAdd className="text-2xl" />}</div>
                            </label>
                        </div>
                    </div>
                </div>
                {
                    option4Img &&
                    <div className="w-1/6">
                        {/* image showing */}
                        <div>
                            <img className={option4Img && "w-12 h-12 rounded-full mx-auto"} src={option4Img} alt='' />
                            {/* <img src={option1Img} alt="" /> */}
                        </div>
                    </div>
                }
            </div>
            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            id="option5"
                            onChange={(e) => setCorrectOption5(e.target.checked)}
                        />
                        <input
                            type="text"
                            name=""
                            htmlFor="option5"
                            className="w-full ml-2 text-lg border rounded border-gray-200 focus:outline-none focus:border-gray-200 pl-2"
                            placeholder="Option 5"
                            onBlur={(e) => setOption5(e.target.value)}
                        />
                        {/* image upload section  */}
                        <div>
                            <input
                                type="file"
                                id="option5Img"
                                style={{ display: "none" }}
                                onChange={(e) => Option5ImgUpload(e)}
                            />
                            <label htmlFor="option5Img">
                                <div className="hover:bg-gray-100 p-2 rounded-full ml-4 md:ml-3 img-upload-btn">{<BiImageAdd className="text-2xl" />}</div>
                            </label>
                        </div>
                    </div>
                </div>
                {
                    option5Img &&
                    <div className="w-1/6">
                        {/* image showing */}
                        <div>
                            <img className={option5Img && "w-12 h-12 rounded-full mx-auto"} src={option5Img} alt='' />
                            {/* <img src={option1Img} alt="" /> */}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CheckBox;