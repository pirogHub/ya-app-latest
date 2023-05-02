import React from "react"

import "./LittleOfferCard.scss"
import { Link } from "react-router-dom"
import MyLink from "../../ui/MyLink"
import ImageLoader from "../../ImageLoader"
import Loader from "../../ui/Loader"

const LittleOfferCard = ({
    width,
    img,
    nameLabel,
    name,
    priceLabel,
    price,
    location,
    locationName,
    additionalInfoLabel,
    additionalInfo,
    link = "/",
    debug,
    isDisabled = true,
    isSpaceBetween
}) => {


    return (

        <div

            className={
                "LittleOfferCard"
                + (isDisabled ? " isDisabled" : "")
                + (isSpaceBetween ? " isSpaceBetween" : "")
            } >
            <MyLink
                wrapperClassName="LittleOfferCard__linkArea"
                to={link}
            >
            </MyLink>
            <img src={img} width={width ? width : "240px"} />


            <p><span>{nameLabel}</span><span>{name}</span></p>
            <p><span>{priceLabel}</span><span>{price}</span></p>
            {
                !!additionalInfo
                && <p><span>{additionalInfoLabel}</span><span>{additionalInfo}</span></p>
            }
            <p style={{ display: "flex", gap: "10px" }}>{location} {locationName ? <MyLink>{locationName}</MyLink> : ""}</p>

        </div >
    )

}


export default LittleOfferCard