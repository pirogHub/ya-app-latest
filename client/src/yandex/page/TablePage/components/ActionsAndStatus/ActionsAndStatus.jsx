import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Randomizer from "../../../../components/FormComponents/Randomizer";
import Loader from "../../../../components/ui/Loader";


import "./ActionsAndStatus.scss"
import { getOffersListState } from "../../../../store/offersList";
import { nounEndings } from "../../../../utils/nounEndings";


const ActionsAndStatus = ({


    onShowOffersClick,
    getRandomSeekerAndLoad,
    onClear,
    toggleAdditionalFilters,
    isShowAdditionalFilters,
    isShort,
    isTransparent

}) => {
    const loadingStatus = useSelector(getOffersListState("loadingStatus"))
    const allCount = useSelector(getOffersListState("allCount"))


    const refStatus = useRef()

    useEffect(() => {


        switch (loadingStatus) {
            case "prepare":
                if (refStatus.current) refStatus.current.classList.remove("statusing_end")
                if (refStatus.current) refStatus.current.classList.remove("statusing_start")
                break;
            case "loading":
                if (refStatus.current) refStatus.current.classList.add("statusing_start")
                break;

            case "loaded":

                if (refStatus.current) refStatus.current.classList.add("statusing_end")
                break;

            default:
                break;
        }
    }, [loadingStatus])


    const [forceUpdate_flag, setForceUpdate_flag] = useState(false)

    return (

        <div className={"ActionsAndStatus__stickyWrapper"
            + (isShowAdditionalFilters ? " toSticky" : "")
            + (isTransparent ? " transparent" : "")
        }>
            <div ref={refStatus} className="ActionsAndStatus__statusBar">
            </div>
            <div className="ActionsAndStatus__stickyActions">
                {!isShort
                    && <div className="ActionsAndStatus__stickyActions_part"
                        style={{ gap: 0 }}
                    >

                        <button
                            onClick={toggleAdditionalFilters}
                            className="btn btn-link">
                            <span className="debug__hiddenFilters">
                                Больше праметров
                                {


                                    <div className="debug__hiddenFilters__icon">
                                        <i className="bi bi-exclamation-circle"></i>
                                    </div>
                                }


                                &nbsp;
                            </span>
                            <i className={"bi bi-chevron" + (isShowAdditionalFilters ? "-up" : "-down")}></i>

                        </button>


                        <button
                            onClick={() => {
                                setForceUpdate_flag(prev => !prev)
                                onClear()
                            }}
                            className="btn btn-red-link"
                        >
                            Сбросить всё
                        </button>

                        <Randomizer
                            forceUpdate_flag={forceUpdate_flag}
                            onClick={() => {

                                const promises = getRandomSeekerAndLoad()

                                return promises
                            }}
                        />

                    </div>
                }
                <div className="ActionsAndStatus__stickyActions_part">

                    <button className="btn btn-gray"><i className="bi bi-geo-alt-fill fill-red"></i>Смотреть на карте</button>
                    <button
                        onClick={loadingStatus !== "loaded" ? undefined : onShowOffersClick}
                        className={"btn btn-yellow" + (loadingStatus !== "loaded" ? " disabled" : "")}
                    >
                        <div
                            style={{ height: "100%", display: "flex", "flexWrap": "nowrap", alignItems: "center" }}
                        >
                            Показать&nbsp;{
                                loadingStatus !== "loaded"
                                    ? <Loader />
                                    : allCount
                            }&nbsp;
                            {
                                !allCount ? "объектов"
                                    : nounEndings(allCount, "объект")
                            }
                        </div>
                    </button>
                </div>
            </div>
        </div>

    )
}


export default ActionsAndStatus