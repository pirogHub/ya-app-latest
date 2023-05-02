import React, { useEffect, useRef, useState } from "react";
import GenRadioCheckboxWrapperWithState from "./GenRadioCheckboxWrapperWithState";
import FormRow from "../../FormComponents/FormRow";


const AOroomsCountComponent = ({
    isDebug,
    name,
    randomState,
    inputsConfig,
    onChange,
    errorsState,
    componentConfig,
    optionsList,
    tryInputsViewAutoWhenNeed
}) => {

    const [state, setState] = useState(
        inputsConfig?.length === 2
            ? {
                [inputsConfig[0].name]: [0],
                [inputsConfig[1].name]: [6],
            }
            : {}
    )

    const refThatRandomStateInited = useRef(false)


    if (randomState && refThatRandomStateInited.current !== (name ? randomState?.[name] : randomState)) {

        let data
        let tmpRandomState = name ? randomState[name] : randomState
        refThatRandomStateInited.current = tmpRandomState // было как выше строка


        data = Object.keys(tmpRandomState).reduce((acc, k) => acc = { ...acc, [k]: tmpRandomState[k].value }, {})

        setState(prev => data)
    } else {

    }
    const handler = (val) => {

        if (refThatRandomStateInited.current === (name ? randomState?.[name] : randomState)) {
            if (isDebug) console.log(`<${name}>`, "resolve randomState  ", "-state", refThatRandomStateInited.current, "-value", state);




            return
        }
        const newState = { ...state, ...val }


        setState(prev => ({ ...newState }))
        onChange({ [name]: val })
    }


    useEffect(() => {
        setState(
            inputsConfig?.length === 2
                ? {
                    [inputsConfig[0].name]: [0],
                    [inputsConfig[1].name]: [0],
                }
                : {})
    }, [])

    return (<>
        <FormRow errorsState={errorsState?.rooms_total} label="Комнат">
            <GenRadioCheckboxWrapperWithState
                type="radio"
                name="rooms_total"
                componentConfig={componentConfig}
                onChange={handler}

                disableBefore={
                    inputsConfig?.length === 2 ? state?.rooms_forSale?.[0] : undefined
                }
                optionsList={optionsList}

                randomState={randomState?.[name]}
                isDebug={isDebug}
                tryInputsViewAutoWhenNeed={tryInputsViewAutoWhenNeed}
            />

        </FormRow>

        {
            inputsConfig?.length === 2
            && <FormRow errorsState={errorsState?.rooms_forSale} label="Комнат в сделке">
                <GenRadioCheckboxWrapperWithState
                    type="radio"
                    name="rooms_forSale"
                    componentConfig={componentConfig}
                    onChange={handler}
                    disableAfter={state?.rooms_total?.[0]}
                    optionsList={optionsList}

                    randomState={randomState?.[name]}
                    isDebug={isDebug}
                    tryInputsViewAutoWhenNeed={tryInputsViewAutoWhenNeed}
                />

            </FormRow>

        }
    </>)
}

export default AOroomsCountComponent