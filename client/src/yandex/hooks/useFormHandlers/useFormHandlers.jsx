import { useEffect, useRef, useState } from "react"
import _ from "lodash"
import RandomAuthor from "../../templateData/random/randomAuthor"

import myLodash from "../../utils/myLodash"


export const useFormHandlers = ({
    initialState,
    onStateChanged,
    onLoadingValToState,
    syntheticRandomStateGetter,
    onTryingSetSyntheticState,
    isSaveFirstInitingStateRef = false,
    onBeforeClearFilters,
    debug,
    onSyntheticStateChanged,
    is_block_OnStateChanged_WhileSyntheticStateInit,
    is_call_onStateChange_whenSintheticStateInited,
    onBeforeSyntheticStateInit,
    is_not_call_if_not_Changed_type_or_category,
    onErrorGeneratedSyntheticState,
    notCreateSyntheticWithKeys
}) => {



    const refState = useRef((initialState ? { ...initialState } : {}))
    const [syntheticState, setSyntheticState] = useState({})
    const currentSyntheticStateDataRef = useRef({})

    const debug_currentSyntheticState_promises_ref = useRef()

    const [togglerClearState, toggleTogglerClearState] = useState(false)

    const refToggleClearPromise = useRef()



    const clearFilters = async (saved, withoutClearSyntheticState, isloadSavedToSyntheticState, is_call_onStateChangedAfter) => {

        if (onBeforeClearFilters) onBeforeClearFilters(refState.current)
        refState.current = saved ? saved : initialState ? { ...initialState } : {}

        if (!withoutClearSyntheticState) {
            setSyntheticState(prev => { })
        }
        if (isloadSavedToSyntheticState) {
            createAndSetSyntheticState(saved)
        }
        toggleTogglerClearState(prev => !prev)

        if (is_call_onStateChangedAfter && onStateChanged) {
            onStateChanged(refState.current)
        }

    }


    useEffect(() => {
        refToggleClearPromise.current?.resolve()
        if (debug) console.log("ASYNC togglerClearState resolve");

    }, [togglerClearState])

    const refIsFirstInit_flag = useRef(true)
    const syntheticStateAsked_ref = useRef(false)

    const createAndSetSyntheticState = (struct, fromServer) => {
        syntheticStateAsked_ref.current = true

        refIsSyntheticStateIniting.current = true

        let debugOfRandomPromises = {}



        const [promises, dataState, syntheticState, isError] = RandomAuthor.getSyntheticStateFromDataState(
            debugOfRandomPromises,
            struct,
            [
                "FullServiceInfo",
                ...(notCreateSyntheticWithKeys ? notCreateSyntheticWithKeys : [])
            ]
        )

        if (isError) {
            if (onErrorGeneratedSyntheticState) onErrorGeneratedSyntheticState()
        }

        currentSyntheticStateDataRef.current = dataState
        if (debug) console.log(" need to RESOLVE this SYNTHETIC STATE", promises);

        if (debug) console.log("downloadAndSetSyntheticState refState.current", refState.current);
        let changedFullPromises = [...promises]
        let changedDataState = dataState
        let changedSyntheticState = syntheticState
        if (onBeforeSyntheticStateInit) {
            const newConfig = onBeforeSyntheticStateInit([changedFullPromises, dataState, syntheticState])
            changedFullPromises = newConfig?.[0]
            changedDataState = newConfig?.[1]
            changedSyntheticState = newConfig?.[2]
        }
        refState.current = _.cloneDeep(changedDataState)
        if (!fromServer) {
            changedFullPromises = [...changedFullPromises]
            if (debug) console.log("Synthetic State To Resolve", changedFullPromises);

            Promise.all(changedFullPromises).then(() => {

                refIsSyntheticStateIniting.current = false
                if (debug) console.log("Synthetic State Resolved", changedFullPromises);
                if (is_call_onStateChange_whenSintheticStateInited) {
                    onStateChanged(changedDataState)
                }
            })
        }

        debug_currentSyntheticState_promises_ref.current = changedFullPromises
        Promise.all(changedFullPromises).then(() => {

            refIsSyntheticStateIniting.current = false

        })

        setSyntheticState(prev => changedSyntheticState)
        if (onSyntheticStateChanged) onSyntheticStateChanged([changedFullPromises, changedDataState, changedSyntheticState])
        return [changedFullPromises, changedDataState, changedSyntheticState]
    }

    const refIsSyntheticStateIniting = useRef(false)
    const downloadAndSetSyntheticState = async (type, category, isShort, afterInitGenerated) => {

        const preState = initialState ? { ...initialState } : {}
        refState.current = {}
        const toSave = {}
        const withoutClearSyntheticState = true
        clearFilters(toSave)

        let struct = await syntheticRandomStateGetter(type, category)

        if (!struct?.error) {
            const [promises, dataState, syntheticState] = createAndSetSyntheticState(struct, true)

            const fullPromises = [...promises]
            if (debug) console.log("Synthetic State To Resolve", fullPromises);

            Promise.all(fullPromises).then(() => {
                if (debug) console.log("Synthetic State Resolved", fullPromises);

                if (onTryingSetSyntheticState) onTryingSetSyntheticState(false, struct)
                if (onStateChanged) onStateChanged(refState.current)
            })

            return [fullPromises, dataState, syntheticState]
        } else {
            clearFilters()

            if (onTryingSetSyntheticState) onTryingSetSyntheticState(false, struct)
            return [4, {}, syntheticState]
        }
    }


    // получает объект с именем фильтрика и значением и устанавливает в объект всех фильтров
    const loadValToState = (value, isFirstInit) => {

        if (is_block_OnStateChanged_WhileSyntheticStateInit && refIsSyntheticStateIniting.current) {

            const tmp = debug_currentSyntheticState_promises_ref.current
            if (debug) console.log("NOT-------------loadValToForm", "data:", value)

            return
        }
        if (debug) console.log("-------------loadValToForm", "value", value);
        const mainKey = Object.keys(value)[0]
        let isBlock_by_notReallyChanged_type = false
        let isBlock_by_notReallyChanged_category = false
        let isBlock_by_notReallyChanged_marketType = false
        if (is_not_call_if_not_Changed_type_or_category
            && (mainKey === "type" || mainKey === "category" || mainKey === "marketType")) {


            const oldType = refState.current?.type?.[0]
            const oldCategory = refState.current?.category?.[0]
            const oldMarketType = refState.current?.marketType?.[0]
            if (mainKey === "type") {
                const newType = value?.type?.[0]
                if (oldType === newType) isBlock_by_notReallyChanged_type = true
            }
            if (mainKey === "category") {
                const newCategory = value?.category?.[0]
                if (oldCategory === newCategory) isBlock_by_notReallyChanged_category = true
            }
            if (mainKey === "marketType") {
                const newMarketType = value?.marketType?.[0]
                if (oldMarketType === newMarketType) isBlock_by_notReallyChanged_marketType = true
            }

        }
        const newState = _.cloneDeep(refState.current)
        // if (debug) console.log("newState BEFORE", newState);

        myLodash.deepMergeWith({ to: newState, from: value, funcWhenCopy: (onLoadingValToState) ? onLoadingValToState : undefined, paramsForFuncWhenCopy: { isFirstInit } })
        // if (debug) console.log("newState AFTER", newState);
        refState.current = _.cloneDeep(newState)
        if (debug) console.log(" refState.current ", refState.current);
        if (debug) console.log("=============loadValToForm", "new refState.current", refState.current)

        if (onStateChanged
            && !isBlock_by_notReallyChanged_category
            && !isBlock_by_notReallyChanged_type
            && !isBlock_by_notReallyChanged_marketType
        ) {

            onStateChanged(refState.current, isSaveFirstInitingStateRef?.current, isFirstInit)

        }


    }

    return {
        refState,
        loadValToState,
        syntheticState,
        downloadAndSetSyntheticState,
        createAndSetSyntheticState,
        togglerClearState,
        clearFilters,
        refIsFirstInit_flag,
        refIsSyntheticStateIniting,
        currentSyntheticStateDataRef,
        debug: true
    }
}