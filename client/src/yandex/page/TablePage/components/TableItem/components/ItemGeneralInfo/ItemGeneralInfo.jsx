import React from "react";
import { Link } from "react-router-dom";

import "./ItemGeneralInfo.scss"
const ItemGeneralInfo = ({
    linkToOffer,
    category,
    area,
    totalRooms,
    builtYear,
    floorsCurrent,
    foorsTotal,
    addressTitle,
    mainTitle,
    additionalTitle
}) => {


    return (
        <div className="general-info">
            <h3
                className="general-info-container"
            >
                <Link
                    to={linkToOffer}
                    className="general-info__title-link"
                    target="_blank"
                >
                    <div className="Link__click-area"></div>
                    <span className="title">

                        {mainTitle}
                    </span>
                </Link>
                <div className="row building">

                    {additionalTitle}

                </div>
                <span className="row adress">

                    <div>
                        {addressTitle}
                    </div>
                </span>
                <div className="row location">
                    <div>
                        <a>Победное</a> <span>4 мин</span>
                    </div>
                </div>
            </h3>
        </div>
    )
}

export default ItemGeneralInfo