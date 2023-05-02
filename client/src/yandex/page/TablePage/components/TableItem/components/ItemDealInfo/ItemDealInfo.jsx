import React from "react";

import "./ItemDealInfo.scss"
const ItemDealInfo = ({
    priceLabel,
    pricePerMeterLabel,
    area
}) => {


    return (
        <div className="deal-info">
            <div className="price">{priceLabel}</div>

            <div className="price-detail">{pricePerMeterLabel}</div>

            <div className="pill text-bg-secondary Tag_theme_realty Tag-text">Ипотека</div>
        </div>
    )
}

export default ItemDealInfo