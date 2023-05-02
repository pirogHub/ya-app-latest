import React from "react";

import "./InputFilesHidden.scss"

const InputFilesHidden = ({ onChange, refInputFile, multiple, accept }) => {


    return (
        <input

            onChange={onChange}
            ref={refInputFile}
            className="InputFile_hidden"
            type="file"

            multiple={multiple ? "multiple" : ""}
            accept="image/jpeg,image/pjpeg,image/gif,image/png,image/x-png,image/webp"

        />
    )
}


export default InputFilesHidden