import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FileShow = ({fileId}) => {
    const [file, setFile] = useState(null)

    useEffect(() => {
        axios.get(`https://examfromhouse.herokuapp.com/getFile/${fileId}`)
            .then((data) => setFile(data.data))
    }, [fileId])
    console.log(file);
    return (
        <div>
            {
            file?.fileType === "image/png" || file?.fileType === "image/jpg" || file?.fileType === "image/jpeg" ?
                <img src={`data:image/png;base64,${file.answer}`} alt="" />: ''
            }
            {
                file?.fileType === "application/pdf" &&
                <iframe src={`data:application/pdf;base64,${file.answer }`} title="user File here"/>}
        </div>
    );
};

export default FileShow;