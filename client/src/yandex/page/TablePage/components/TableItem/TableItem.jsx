import React, { forwardRef, useRef, useState } from "react";


import ItemDealInfo from "./components/ItemDealInfo";
import ItemGeneralInfo from "./components/ItemGeneralInfo";
import SmallSlider from "../../../../components/ui/Sliders/smallSlider/smallSlider";

import "./TableItem.scss"
import ItemMeta from "./components/ItemMeta";
import ItemAuthor from "./components/ItemAuthor";
import ItemPremiumFooter from "./components/ItemPremiumFooter/ItemPremiumFooter";
import ItemFooterActions from "./components/ItemFooterActions/ItemFooterActions";
import ItemFooter from "./components/ItemFooter";
import ItemDescription from "./components/ItemDescription";
import offerTransform from "../../../../utils/offerTransform";
import { useFetchUser } from "../../../../hooks/useFetchUser/useFetchUser";


const TableItem = forwardRef(({ offer, className, currentIdx }, ref) => {
    const { fetchUser } = useFetchUser()
    const [author, setAuthor] = useState()
    const [generalViewOffer, setGeneralViewOffer] = useState()
    const refIsAlreadyTransforming = useRef(false)
    useState(() => {
        let tmp = offer

        if (!generalViewOffer && !refIsAlreadyTransforming.current) {
            tmp = offerTransform.toGeneralView(offer.category, offer)
            refIsAlreadyTransforming.current = true

        }
        fetchUser(offer.userId, setAuthor)
        setGeneralViewOffer(tmp)
    }, [offer])

    if (!generalViewOffer) return <></>
    return (<>
        <div
            ref={ref}
            className={
                "TableItem"
                + (className ? ` ${className}` : "")
            }
        >
            <div className="left_part">
                <div className="index_wrapper">№:&nbsp;{currentIdx}</div>

                <SmallSlider
                    className="f-1"
                    images={generalViewOffer.imgPhotos}
                    // images={[]}

                    linkToOffer={generalViewOffer.linkToOffer}
                    bottomImgs_flag={true}
                />
            </div>
            <div className="building_info f-5">
                <div className="building_info_main">

                    <ItemGeneralInfo
                        linkToOffer={generalViewOffer.linkToOffer}
                        mainTitle={generalViewOffer.titles.mainTitle}
                        additionalTitle={generalViewOffer.titles.additionalTitle}

                        addressTitle={generalViewOffer.titles.addressTitle}

                    />

                    <ItemDealInfo
                        area={generalViewOffer.totalArea}

                        pricePerMeterLabel={generalViewOffer?.priceDetails?.pricePerMeterLabel}
                        priceLabel={generalViewOffer?.priceDetails?.priceLabel}
                    />
                </div>


                <ItemDescription
                    story={generalViewOffer?.description?.story}
                />


                <ItemFooter>
                    <ItemFooterActions
                        tel="+7 777 777 77 77"
                    />


                    <ItemPremiumFooter link={author ? `/user/${author.userId}` : undefined} >
                        {author && <ItemAuthor
                            author={author}

                        />
                        }
                        <ItemMeta
                            updatedAt={generalViewOffer?.createdAt}
                        />
                    </ItemPremiumFooter>

                </ItemFooter>
            </div>
        </div >
    </>
    )

})

export default TableItem