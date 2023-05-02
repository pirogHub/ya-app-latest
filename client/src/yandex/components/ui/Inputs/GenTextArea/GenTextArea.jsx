import React, { useEffect, useRef, useState } from "react";

import "./GenTextArea.scss"
import FormRow from "../../../FormComponents/FormRow";
import { useRandomStateHandler } from "../../../../hooks/useRandomStateHandler/useRandomHandler";

const GenTextArea = ({ formState, name, loadValToForm, randomState, errorsState }) => {

    const refTextArea = useRef()


    const [state, setState] = useState()

    const { checkIsRandomStateResolved_AND_resolveIfNot } = useRandomStateHandler({
        reactComponentName: "GenTextArea",
        componentName: name,
        randomState,
        onNewRandomStateDetected: (data, resolveRandomState) => {
            refTextArea.current.value = data
            autoGrow(refTextArea.current)
            setState(prev => data)
        },
        isDebug: true
    })



















    useEffect(() => {














        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return
        let data = ""
        if (state === undefined) {

            setState(prev => data)

            loadValToForm({ [name]: data })
            return
        }



    })


    const onBlurHandler = ({ target }) => {
        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return

        if (loadValToForm) loadValToForm({ [name]: target.value })
    }


    function autoGrow(target) {
        target.style.height = 'auto';
        const height = target.scrollHeight > target.style.minHeight ? target.scrollHeight : target.style.minHeight
        target.style.height = height + 'px';
    }

    return (

        <FormRow errorsState={errorsState}>
            <textarea

                ref={refTextArea}
                name={name}
                className="Gentextarea"
                autoComplete="off"
                rows="5"
                onBlur={onBlurHandler}
                onChange={({ target }) => {

                    autoGrow(target)
                }}
                placeholder="Опишите недвижимость"

            >

            </textarea>
        </FormRow>
    )
}

export default GenTextArea