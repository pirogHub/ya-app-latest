import React, { useEffect, useMemo, useState } from "react";
import inputsGenerator from "../../../../../../components/ui/Inputs/InputsGenerator";

import "./AdditionalFilters.scss"
import Loader from "../../../../../../components/ui/Loader";
import { getComponentStruct } from "../../../../../../store/componentsStructs";
import { useDispatch } from "react-redux";



const getLabel = (sctuctName) => {
    switch (sctuctName) {
        case "flat": return "Квартирах"
        case "room": return "Комнатах"
        case "house": return "Домах"
        case "commercial": return "Коммерч. недвижимости"
        case "garage": return "Гаражах"
        case "land": return "Земле"

        default:
            break;
    }

}



const AdditionalFilters = ({
    structName,
    clearFiltersToggler,
    onChange,
    syntheticState,
    onDownloadStructEnd,
    onDownloadStructStart
}
) => {

    const [isDownloadingStruct, setIsDownloadingStruct] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {

        setIsDownloadingStruct(prev => true)
        async function fetchComponentsStruct() {
            const struct = await dispatch(getComponentStruct({ structName, toWhoom: "seeker" }))
            setServerComponentsStruct(struct)
            setIsDownloadingStruct(prev => false)
        }
        fetchComponentsStruct()
    }, [structName])


    const [serverComponentsStruct, setServerComponentsStruct] = useState(null)
    const inputList = useMemo(() => inputsGenerator({
        serverComponentsStruct,
        loadValToForm: onChange,
        syntheticStateOfAll: syntheticState,
        clearTogglerFlag: clearFiltersToggler,
        onGeneratingStart: onDownloadStructStart,
        onGeneratingEnd: onDownloadStructEnd,
    }), [serverComponentsStruct, syntheticState, clearFiltersToggler])



    useEffect(() => {

    }, [structName])

    return (
        <div className="TableFilters__additionalFilters">
            {
                isDownloadingStruct
                && <div className="TableFilters__loaderWrapper"><Loader /></div>
            }


            {
                serverComponentsStruct
                && <>
                    <div className="TableFilters__additionalFilters__title">
                        <div className="TableFilters__additionalFilters__title__Category"> Расширенный Поиск по Предложениям о&nbsp;</div>
                        <div className="TableFilters__additionalFilters__title__Category_NAME">{getLabel(structName)}:</div>
                    </div>
                    {inputList}

                </>
            }
        </div>

    )
}

export default AdditionalFilters