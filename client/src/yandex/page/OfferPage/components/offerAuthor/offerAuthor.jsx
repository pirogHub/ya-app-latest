import React from "react";


import "./offerAuthor.scss"

import "../../../../components/Cards/offerCard.scss"
import { useFetchUser } from "../../../../hooks/useFetchUser/useFetchUser";
import ItemAuthor from "../../../TablePage/components/TableItem/components/ItemAuthor";
import MyLink from "../../../../components/ui/MyLink";
const OfferAuthor = ({ author }) => {


    const who = author?.developer ? "Застройщик" : "Продавец"


    if (!author) return




    return (
        <div className={"offerCard"}>
            <div className="offerCard__title"><h2>
                {who} &nbsp;
                <MyLink
                    isInline={true}
                    to={`/user/${author.userId}`}
                    className="link fill-blue">
                    «{author.userName}»
                </MyLink>
            </h2>
            </div>


            <MyLink

                to={`/user/${author.userId}`}
                className="offerCard__content link fill-blue">

                <div className="OfferAuthor__wrapper">
                    < div className="OfferAuthor__ImageWrapper">

                        <img className="OfferAuthor__image"

                            src={author.avatarLink}
                        />

                    </div>


                    <div className="OfferAuthor__name">
                        {author.userName}
                    </div>
                </div>

            </MyLink >
        </div >
    )
}

export default OfferAuthor