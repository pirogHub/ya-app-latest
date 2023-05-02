import React, { useEffect, useRef, useState } from "react";
import { thousandDelimeter } from "../../../../utils/thousandDelimeter";

import "./GenTextInput.scss"
import { useRandomStateHandler } from "../../../../hooks/useRandomStateHandler/useRandomHandler";



const debug_log_GenTextInput = false

const GenTextInput = ({
    refAnti_FirstRerender,
    parentName,
    formState,
    name,
    type,
    classNameInput, isWidth100,
    loadValToForm,
    size, maxLength, placeholder, // мы задать по умолчанию значения
    refForInput,
    onChange_flag, onClear,
    className,
    customDelimeterFunc,
    isThousandDelimeter,
    isDebug,
    randomState,
    notRemoveSpaces, // добавить из TextInput
    isPlaceholderWidth,// постарается ли input растянуться так, чтобы был виден placeholder
    onBlur,
}) => {




    const fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue = useRef({ wasFirstRenderUseEffect: false, wasFirstStateInit: false })




    const positionRef = useRef()
    const spacesCount = useRef(0)


    const refClear = useRef()
    const refInput = useRef()

    const currentRefInput = refForInput ? refForInput : refInput

    const delimeterFunc = useRef(customDelimeterFunc
        ? customDelimeterFunc
        : isThousandDelimeter
            ? thousandDelimeter
            : undefined)



    const [state, setState] = useState("")





    const {
        checkIsRandomStateResolved_AND_resolveIfNot,
        checkIsRandomStateResolvedOnly
    }
        = useRandomStateHandler({
            reactComponentName: "GenTextInput",
            componentName: name,
            randomState: randomState,
            onNewRandomStateDetected: (data) => {

                onChangeHandler({ target: { value: data } });
                loadToUp(data)
            },
            parentName: parentName,
            isDebug
        })


    useEffect(() => {
        const val = name ? formState?.[name] : formState
        if (val !== undefined) onChangeHandler({ target: val })
    }, [formState])

    useEffect(() => {


        fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstRenderUseEffect = true
        if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + " " + name}>`, "GENTEXTINPUT FIRST RENDER useEffect state", state);
        if (!checkIsRandomStateResolvedOnly()) return
        if (!randomState) loadToUp(state, true)
    }, [])

    useEffect(() => {
        if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + " " + name}>`, "useEffect state", state);
        if (onChange_flag) {

            if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + " " + name}>`, "useEffect state onChange_flag", state);

            // потому что мы и так отправляем в useEffect по []. в useEffect по [state] нам не надо, чтоб условного initstate дублировалась
            if (fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current
                .wasFirstRenderUseEffect === true) {
                if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + " " + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstRenderUseEffect);

                if (fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current
                    .wasFirstStateInit === false) {
                    if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + " " + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstStateInit);

                    fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.
                        wasFirstStateInit = true
                } else {
                    if (!checkIsRandomStateResolvedOnly()) return
                    if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + "> <" + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstStateInit);
                    if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + "> <" + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstStateInit);
                    loadToUp()
                }
            }
        }
    }, [state])

    const loadToUp = (issue, isFirstInit) => {


        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return
        if (isDebug && debug_log_GenTextInput) console.log(`<${parentName + " " + name}>`, "UPload State useEffect", "-data", state);
        const issueState = issue !== undefined ? issue : state
        let val = !notRemoveSpaces ? issueState.replaceAll(" ", "") : issueState
        val = name ? { [name]: val } : val

        if (loadValToForm) loadValToForm(val, isFirstInit)
    }




    const handleClear = () => {

        setState(prev => "")
        currentRefInput.current.value = ""
        if (onClear) onClear()

        toggleRemover()

        loadToUp("")
    }

    const onBlurHandler = () => {

        if (onBlur) onBlur()
        toggleRemover()
        loadToUp()
    }

    const toggleRemover = () => {

        refClear.current.classList[(currentRefInput.current.value) ? "add" : "remove"]("TextInput__visible")

    }

    const onChangeHandler = (e) => {


        if (e.target.value === state) return

        if (e.target.value === "" || e.target.value) {
            if (!delimeterFunc.current) {
                currentRefInput.current.value = e.target.value


                setState(prev => e.target.value)

            } else {


                const obj = { ...delimeterFunc.current(e.target.value, spacesCount.current) }


                currentRefInput.current.value = obj.formattedString
                spacesCount.current = obj.newSpacesCount
                positionRef.current += obj.positionDiff
                setState(prev => obj.formattedString)

            }
        } else {
            setState(prev => "")

        }

        toggleRemover()
    }












    return (
        <span className={"InputControl_box"
            + (className ? ` ${className}` : "")
            + (isWidth100 ? " w100" : "")}>

            <input
                size={isPlaceholderWidth && placeholder?.length ? placeholder?.length : size}
                ref={currentRefInput}
                onChange={onChangeHandler}
                className={!classNameInput ? ("AddOffer__input") : ` ${classNameInput}` + (isWidth100 ? " w100" : "")}
                onBlur={onBlurHandler}
                onFocus={toggleRemover}
                type={type ? type : "text"}
                maxLength={maxLength}
                placeholder={placeholder}

            />
            <span onClick={handleClear} ref={refClear} className="TextInput__clear">
                <i className="TextInput__clear-icon"></i>
            </span>
        </span>
    )
}

export default GenTextInput