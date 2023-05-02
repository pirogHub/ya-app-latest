import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "./TwoInputs.scss"
import GenTextInput from "../GenTextInput";


const CollectiveBorder = ({ collectiveBorder, children }) => {
    if (collectiveBorder) {
        return (
            <div className={collectiveBorder ? "filterItem" : ""}>
                {children}
            </div>
        )
    } else {
        return <>
            {children}
        </>
    }
}


const debug_log_TwoInputs = false

const TwoInputs = ({
    name,
    inputsConfig,
    onChange,
    randomState,
    divider,
    collectiveBorder,
    Postfix,
    isDebug,
    isInputBorder,
    isWithoutPostfixDivider,
    errorsState
}) => {

    const refAnti_FirstRerender = useRef(0)



    const handler = (val, isFirstInit) => {

        if (isDebug && debug_log_TwoInputs) console.log(`<${name} "TwoInputs">`, "UPload State useEffect", "val", val,);
        if (name) onChange({ ...{ [name]: { ...val } } }, isFirstInit)
        else onChange({ ...val }, isFirstInit)
    }



    useEffect(() => {
        if (debug_log_TwoInputs) console.log(`<${name}>`, "TWOINPUTS FIRST RENDER useEffect");
        refAnti_FirstRerender.current++
    }, [])



    return (
        <CollectiveBorder collectiveBorder={collectiveBorder} key={name} >
            {inputsConfig.map(
                (input, idx) => {
                    return <React.Fragment key={inputsConfig[idx]?.name} >
                        <GenTextInput

                            refAnti_FirstRerender={refAnti_FirstRerender.current}
                            parentName={name}
                            key={inputsConfig[idx]?.name}
                            {...(inputsConfig[idx])}
                            isDebug={isDebug}
                            name={inputsConfig[idx].name}
                            randomState={randomState?.[name]}
                            classNameInput={isInputBorder ? "" : "simpleInput"}
                            loadValToForm={handler}
                            isWidth100={inputsConfig[idx]?.width100 ? inputsConfig[idx]?.width100 : false}
                            size={inputsConfig[idx]?.size ? inputsConfig[idx]?.size : 4}
                            maxLength={inputsConfig[idx]?.maxLength ? inputsConfig[idx]?.maxLength : 3}
                            placeholder={inputsConfig[idx]?.placeholder}
                            isPlaceholderWidth={inputsConfig[idx]?.isPlaceholderWidth}
                        />
                        {idx + 1 !== inputsConfig.length ? <span>{divider ? divider : "-"}</span> : <></>}
                    </React.Fragment>
                }
            )
            }

            {Postfix ? <span className={"postfix" + (isWithoutPostfixDivider ? "" : " border-left")}>{Postfix}</span> : ""}

        </CollectiveBorder >

    )
}

export default TwoInputs