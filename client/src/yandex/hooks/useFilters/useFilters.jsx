import { useEffect, useRef, useState } from "react"

import _ from "lodash"
import RandomAuthor from "../../templateData/random/randomAuthor"
import { SuperPromiseTimeout } from "../../utils/superPromise"
import { useDispatch } from "react-redux"
import { clearLoadingStatus, getOffersList, prepareRequest, tryRequestWithSameFilters } from "../../store/offersList"
import { queryStringCreator } from "../../utils/queryStringCreator"
import { updateFilters } from "../../store/filters"
import { useHistory, useLocation } from "react-router-dom"
import { useFormHandlers } from "../useFormHandlers/useFormHandlers"
import { ERROR_TYPES, setError } from "../../store/errors"

export const useFilters = ({
    onBeforeSyntheticStateInit,
    syntheticRandomStateGetter,
    onFiltersChangeStopper,
    beforeStateChangedMiddlewareBlock,
    isSaveFirstInitingStateRef,
    isParsingQueryBeforeFirstFetch,
    redirectedFromHome_uploadOffersBlockerRef,
    simpleDefaultStateIfNotStateAtQuery,
    onSyntheticStateChanged,
    is_block_OnStateChanged_WhileSyntheticStateInit,
    is_call_onStateChange_whenSintheticStateInited,
    is_atFirst_DoQueryParse_and_Init,
    is_not_call_if_not_Changed_type_or_category,
    onErrorGeneratedSyntheticState
}) => {
    const debug = true
    let location = useLocation()
    const history = useHistory()


    const dispatch = useDispatch()

    const timer_delayBeforeFetchOffers_ref = useRef()
    const refPrevPromise = useRef()
    const refPrevQueryString = useRef()
    const is_quearyAlreadyParsed_ref = useRef(false)
    const [isBlock_untilQueryParsed_and_Init, set_isBlock_untilQueryParsed_and_Init] = useState(true)


    const onStateChanged = async (newState, isSaveFirstInitingState, isFirstInit, stateFromUrl, isCalledBySyntheticStateChange) => {


        let state = newState
        let isNotBlock = true
        if (beforeStateChangedMiddlewareBlock) {
            const [changedState, changedIsNotBlock] = beforeStateChangedMiddlewareBlock(newState, isSaveFirstInitingState, isFirstInit, stateFromUrl, isCalledBySyntheticStateChange)
            state = changedState
            isNotBlock = changedIsNotBlock
        }

        if (!isNotBlock) return

        if (isParsingQueryBeforeFirstFetch && !is_quearyAlreadyParsed_ref.current) {
            return
        }

        if (redirectedFromHome_uploadOffersBlockerRef?.current && isFirstInit) {
            return
        }

        if (redirectedFromHome_uploadOffersBlockerRef && redirectedFromHome_uploadOffersBlockerRef?.current === null) {
            redirectedFromHome_uploadOffersBlockerRef.current = false
            return
        }

        if (isFirstInit && isSaveFirstInitingStateRef && isSaveFirstInitingStateRef?.current) {
            return
        }

        if (!isFirstInit && isSaveFirstInitingStateRef && isSaveFirstInitingStateRef?.current) {
            isSaveFirstInitingStateRef.current = false
        }


        onFiltersChange(state)
    }

    const {
        refState: refFiltersState,
        loadValToState,
        syntheticState,
        downloadAndSetSyntheticState,
        createAndSetSyntheticState,
        togglerClearState,
        clearFilters,
        refIsFirstInit_flag,
        refIsSyntheticStateIniting,
        currentSyntheticStateDataRef
    }
        = useFormHandlers({
            onErrorGeneratedSyntheticState,
            is_not_call_if_not_Changed_type_or_category,
            onBeforeSyntheticStateInit,
            debug: true,
            is_call_onStateChange_whenSintheticStateInited,
            is_block_OnStateChanged_WhileSyntheticStateInit,
            onSyntheticStateChanged,
            onStateChanged: (newState, isSaveFirstInitingState, isFirstInit, isCalledBySyntheticStateChange) => {
                const stateFromUrl = undefined
                onStateChanged(newState, isSaveFirstInitingState, isFirstInit, stateFromUrl, isCalledBySyntheticStateChange)
            },
            syntheticRandomStateGetter: syntheticRandomStateGetter,
            isSaveFirstInitingStateRef,
            debug,
        })

    const queryFilters_expiredIn_ref = useRef(Date.now())

    // получает query params в виде объекта из адресной строки и устанавливает из через setSyntheticState
    useEffect(() => {


        if (!isParsingQueryBeforeFirstFetch) {

            return
        }
        if (debug) console.log("first Render");
        if (debug) console.log("location", location);
        const queryString = location.search//.slice(1)
        if (debug) console.log("queryString", queryString);
        let stateFromUrl
        if (queryString) {


            const queryParameters = new URLSearchParams(queryString)


            for (const [key, value] of (queryParameters.entries())) {
                let parsed = undefined
                try {
                    parsed = JSON.parse(value)
                } catch (error) {
                    parsed = undefined
                }

                stateFromUrl = { ...stateFromUrl, [key]: parsed }
            }
            if (debug) console.log("stateFromUrl", stateFromUrl);


            if (stateFromUrl?.filters && (Object.keys(stateFromUrl.filters)?.length)) {
                if (!stateFromUrl.filters?.category?.[0]) {
                    if (simpleDefaultStateIfNotStateAtQuery) {
                        Object.keys(simpleDefaultStateIfNotStateAtQuery).forEach(k => {
                            stateFromUrl.filters[k] = simpleDefaultStateIfNotStateAtQuery[k]
                        })
                    }


                    stateFromUrl.filters.category = stateFromUrl.filters?.category?.[0] ? stateFromUrl.filters.category : ["flat"]
                    stateFromUrl.filters.type = stateFromUrl.filters?.type?.[0] ? stateFromUrl.filters.type : ["sell"]
                    stateFromUrl.category = stateFromUrl.filters.category?.[0]

                }
            }

            const isInvalid_simpleInvalidCheck = !stateFromUrl?.filters
                || JSON.stringify(stateFromUrl?.filters).includes("Object")
                || JSON.stringify(stateFromUrl?.filters).includes("JSON")
                || JSON.stringify(stateFromUrl?.filters).includes("stringify")
                || typeof stateFromUrl?.filters !== "object"

            if (isInvalid_simpleInvalidCheck) {
                refFiltersState.current = { type: ["sell"], category: ["flat"] }
            } else {
                refFiltersState.current = _.cloneDeep(stateFromUrl?.filters)

            }


            const [fullPromises, dataState, syntheticState] = createAndSetSyntheticState(refFiltersState.current)
        }

        is_quearyAlreadyParsed_ref.current = true




        if (
            redirectedFromHome_uploadOffersBlockerRef
            && redirectedFromHome_uploadOffersBlockerRef?.current
        ) {


            if (queryString) redirectedFromHome_uploadOffersBlockerRef.current = null
            else redirectedFromHome_uploadOffersBlockerRef.current = null
        } else {

            onStateChanged(refFiltersState.current, true, true)
        }

    }, [])


    useEffect(() => {
        let tmp = isBlock_untilQueryParsed_and_Init
        if (is_quearyAlreadyParsed_ref.current) {
            tmp = false
        }

        set_isBlock_untilQueryParsed_and_Init(tmp)
    }, [syntheticState])

    // получает с сервера рандомные значения фильтров и устанавливает их
    // todo: получение с сервера значений для дополнительных фильтров только по флагу isShort
    const downloadAndSetSyntheticStateForFilters = async (isShort, afterInitGenerated) => {

        const [fullPromises, dataState,] = await downloadAndSetSyntheticState()

        Promise.all([fullPromises]).then(() => onFiltersChange(refFiltersState.current))
        return [fullPromises, {}]
    }

    // получает с сервера офферы по фильтрам
    const fetchOffers = (filters, onLoadFinithed) => {

        dispatch(prepareRequest({ type: filters?.type, category: filters?.category }))
        // -------------------start задержка для анимации loadingstatus
        if (timer_delayBeforeFetchOffers_ref.current) clearTimeout(timer_delayBeforeFetchOffers_ref.current)
        if (refPrevPromise.current?.reject) refPrevPromise.current.reject()

        refPrevPromise.current = SuperPromiseTimeout(1000, "11", "-11")
        // --------------------end задерка для анимации loadingstatus

        refPrevPromise.current
            .then(() => {

                const filtersQueryString = queryStringCreator(filters)

                if (
                    filtersQueryString !== refPrevQueryString.current
                    || queryFilters_expiredIn_ref.current < Date.now()) {
                    queryFilters_expiredIn_ref.current = Date.now()
                    refPrevQueryString.current = filtersQueryString

                    history.push(`${history.location.pathname + "?" + filtersQueryString}`)

                    dispatch(updateFilters(filters, filtersQueryString))


                    dispatch(getOffersList({ filtersQueryString, filters }))
                } else {
                    if (onLoadFinithed) onLoadFinithed()

                    dispatch(tryRequestWithSameFilters())
                }
            })
            .catch(err => {

                // dispatch(setError({ message: "Пожалуйста, помедленнее...", errorType: ERROR_TYPES.VALID }))
                dispatch(tryRequestWithSameFilters())
            })
    }

    // при изменении фильтра делает задержку перед fetchOffers, если вдруг юзер тыкнет сразу во что-нибудь еще
    const onFiltersChange = (filtersState) => {
        const tmp = filtersState


        if (timer_delayBeforeFetchOffers_ref.current) clearTimeout(timer_delayBeforeFetchOffers_ref.current)

        if (refPrevPromise.current?.reject) refPrevPromise.current.reject()
        refPrevPromise.current = SuperPromiseTimeout(1000, "11", "-11")


        refPrevPromise.current
            .then(() => new Promise((res, rej) => { res(fetchOffers(filtersState)) }))
            .catch((data) => { })
    }

    useEffect(() => {
        const tmp = refFiltersState.current


    }, [refFiltersState.current?.category?.[0]])


    const clearFiltersBefore = ({ toSave, withoutClearSyntheticState, isloadSavedToSyntheticState, is_call_onStateChangedAfter }) => {


        clearFilters(toSave, withoutClearSyntheticState, isloadSavedToSyntheticState, is_call_onStateChangedAfter)
    }

    return {
        refFiltersState,
        loadValToFiltersState: loadValToState,
        syntheticState,
        downloadAndSetSyntheticStateForFilters,

        clearFiltersToggler: togglerClearState,

        clearFilters: clearFiltersBefore,
        currentSyntheticStateDataRef,
        is_quearyAlreadyParsed_ref,
        isBlock_untilQueryParsed_and_Init,
        is_atFirst_DoQueryParse_and_Init
    }
}