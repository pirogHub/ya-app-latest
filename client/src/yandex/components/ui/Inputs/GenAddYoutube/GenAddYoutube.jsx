import React, { useEffect } from "react";

import GenTextInput from "../GenTextInput";

import "./GenAddYoutube.scss"


const GenAddYoutube = ({
    name,
    loadValToForm,
    randomState,
    errorsState,
    isNotRequired }) => {

    const handler = (val) => loadValToForm({ [name]: val })



    return (
        <>
            <div>
                {isNotRequired
                    && <div className="AddYoutube__isNotRequired__title">

                        *Необязательно для заполнения*

                    </div>
                }
                <p>Требования к контенту ролика, а также ссылка на помощь с <a href="/" className="Link">рекомендациями по подготовке ролика</a></p>

                <GenTextInput

                    randomState={randomState?.[name]}
                    loadValToForm={handler}
                    placeholder={"https://youtu.be/pAP9LqDqR_c"}
                    isWidth100={true} />

            </div>
        </>
    )
}

export default GenAddYoutube