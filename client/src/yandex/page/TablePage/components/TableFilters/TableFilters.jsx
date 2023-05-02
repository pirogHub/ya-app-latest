import React from "react";


import "./TableFilters.scss"

import AdditionalFilters from "./components/AdditionalFilters";
import AlwaysFilters from "./components/AlwaysFilters";

const TableFilters = ({
    seekerCategory,
    clearFiltersToggler,
    loadValToForm,
    isShowAdditionalFilters,
    syntheticState,
    onDownloadStructStart,
    onDownloadStructEnd
}) => {



    return (<>


        <AlwaysFilters
            currentCategory={seekerCategory}
            clearFiltersToggler={clearFiltersToggler}
            key={"AlwaysFilters"}
            syntheticState={syntheticState}
            onChange={loadValToForm}
        />

        <div className={"TableFilters__footer" + (isShowAdditionalFilters ? " additionalFilters-show" : "  additionalFilters-none")}>
            {

                <AdditionalFilters
                    structName={seekerCategory}
                    key={"AdditionalFilters" + clearFiltersToggler}
                    clearFiltersToggler={clearFiltersToggler}
                    syntheticState={syntheticState}
                    onChange={loadValToForm}
                    onDownloadStructStart={onDownloadStructStart}
                    onDownloadStructEnd={onDownloadStructEnd}
                />
            }
        </div>
    </>
    )
}

export default TableFilters