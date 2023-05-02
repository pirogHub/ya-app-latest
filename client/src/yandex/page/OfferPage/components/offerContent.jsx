import React, { useEffect, useRef, useState } from "react";
import LittleOfferCard from "../../../components/Cards/LittleOfferCard";
import { dataForSlider } from "../../../data/forSlider";
import OfferCard from "../../../components/Cards/offerCard";
import OfferDetailItem from "./OfferDetailItem";

import OfferDescription from "./offerDescription";
import OfferAuthor from "./offerAuthor";
import { useParams } from "react-router-dom";
import Loader from "../../../components/ui/Loader/Loader";
import offerService from "../../../services/offer.service";
import BigSliderYa from "../../../components/ui/Sliders/bigSlider/bigSliderYa";
import SliderShell from "../../../components/ui/Sliders/SliderShell/SliderShell";
import offerTransform from "../../../utils/offerTransform";
import PriceStatisticWithChart from "./PriceStatisticWithChart";


import "./offerContent.scss"
import { useFetchUser } from "../../../hooks/useFetchUser/useFetchUser";
import ToTopScroller from "../../../components/ToTopScroller/ToTopScroller";
import OfferTitles from "./OfferTitles/OfferTitles";
import MyMapYa from "../../../components/ui/Map/MyMapYa";
import OfferByCategoryGetter from "../../../hocs/OfferByCategoryGetter/OfferByCategoryGetter";
import ToTopButton from "../../../ToTopButton/ToTopButton";
import { useInfScrollObserver } from "../../../hooks/useInfScrollObserver/useInfScrollObserver";







const OfferContent = (props) => {
    const { category, id } = useParams()
    const [author, setAuthor] = useState(null)
    const [offer, setOffer] = useState()
    const [generalViewOffer, setGeneralViewOffer] = useState()
    const refVideo = useRef()


    const [isHideToTopButton, setIsHideToTopButton] = useState(false)

    const [toTopButton_hider_ref] = useInfScrollObserver({

        actionFunc: () => setIsHideToTopButton(true),

    })
    const [toTopButton_shower_ref] = useInfScrollObserver({

        actionFunc: () => setIsHideToTopButton(false),

    })
    const { fetchUser } = useFetchUser()

    useEffect(() => {

        const wasTryEditingOffer = props?.location?.wasTryEditingOffer
        if (wasTryEditingOffer) {

        }
        const alreadyFetchedOffer = props?.location?.alreadyFetchedOffer

        if (alreadyFetchedOffer) {
            setOffer(prev => alreadyFetchedOffer)
        } else {
            async function fetchOffer() {
                const data = await offerService.getByCategoryAndId({ category, id })
                setOffer(prev => data ? data : 0)
            }
            fetchOffer()
        }

    }, [id])

    useEffect(() => {
        if (offer && !offer?.generalView) {
            setGeneralViewOffer(offerTransform.toGeneralView(offer.category, offer))
        } else {
            setGeneralViewOffer(offer)
        }
        toScrollToTop(true)

    }, [offer])




    useEffect(() => {
        if (!generalViewOffer) return

        fetchUser(generalViewOffer.userId, setAuthor)

        if (generalViewOffer?.videoYoutube) {

        }

        if (refVideo.current) {
            refVideo.current.style["margin-top"] = "30px"
            refVideo.current.height = (+refVideo.current.clientWidth * (315 / 560)).toFixed(2)
        }
    }, [generalViewOffer])

    const refToTopScroll = useRef()


    const toScrollToTop = (withoutSmooth) => {
        if (refToTopScroll.current) {
            if (withoutSmooth) {
                refToTopScroll.current.scrollIntoView({ block: "start" });

            } else {

                refToTopScroll.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }

    useEffect(() => {
        toScrollToTop()
    }, [refToTopScroll.current])


    return (

        <div
            key={generalViewOffer?._id}
            ref={refToTopScroll}>
            <div ref={toTopButton_hider_ref}></div>
            <ToTopButton
                onClick={toScrollToTop}
                isHide={isHideToTopButton}
            />
            {
                (generalViewOffer === 0)
                    ? <div> {`Предложения с id <${id}> нет :(`}</div>
                    : (!generalViewOffer)
                        ? <Loader size={"120px"} />
                        :
                        <>
                            <ToTopScroller key={"topScroller"} />
                            <OfferTitles
                                address={generalViewOffer.address}
                                titles={generalViewOffer?.titles}
                            />

                            <BigSliderYa
                                key={"BigSliderYa"}
                                images={generalViewOffer.imgPhotos}
                                imagesPlan={generalViewOffer.imgPlan}
                            />

                            <div className={"mb-10" + " opacityByHover"}>
                                <SliderShell
                                    key={"SliderShell"}
                                    controllButtons_flag={false}>

                                    {dataForSlider.map(
                                        (i, idx) =>
                                            <OfferByCategoryGetter category={category} Component={LittleOfferCard} />
                                    )}
                                </SliderShell>
                            </div>

                            {(!!generalViewOffer.characteristics?.mainRow?.content) &&
                                <OfferCard
                                    key={"MainRow"}
                                    beautyFlexChildren={true}
                                    childrenFlexOne={true}
                                    className={"my-nowrap"}
                                    label={generalViewOffer.characteristics.mainRow.label}>
                                    {generalViewOffer.characteristics.mainRow.content.map(c => {
                                        return <OfferDetailItem key={c.label + c.value} label={c.label} value={c.value} isNotEmpty={c.isNotEmpty} />
                                    })}
                                </OfferCard>
                            }

                            {!!generalViewOffer.characteristics?.additional
                                && generalViewOffer.characteristics?.additional.map((a, idx) => {
                                    return <OfferCard
                                        key={a.label + idx}
                                        beautyFlexChildren={true}
                                        childrenFlexOne={true}
                                        needBottomBorder={true}
                                        label={a.label}>
                                        {a.content.map((i, idx) => (
                                            <OfferDetailItem key={i.label + i.value} label={i.label} value={i.value} isNotEmpty={i.isNotEmpty} />
                                        ))}
                                    </OfferCard>

                                })}
                            <div ref={toTopButton_shower_ref}></div>
                            {!!generalViewOffer.characteristics?.priceDetails

                                && <OfferCard
                                    key={"О Сделке"}
                                    beautyFlexChildren={true}
                                    childrenFlexOne={true}
                                    needBottomBorder={true}
                                    label={"О Сделке"}>
                                    {generalViewOffer.characteristics?.priceDetails.content.map((i, idx) => (
                                        <OfferDetailItem key={i.label + i.value} label={i.label} value={i.value} isNotEmpty={i.isNotEmpty} />
                                    ))}
                                </OfferCard>
                            }



                            <OfferCard
                                key={`Динамика изменения цены на ${generalViewOffer.nameForOfferPage}`}
                                beautyFlexChildren={true}
                                childrenFlexOne={true}
                                needBottomBorder={true}
                                className={"my-nowrap"}
                                spaceBetween={true}
                                label={`Динамика изменения цены на ${generalViewOffer.nameForOfferPage}`}
                            >

                                <PriceStatisticWithChart
                                    currentTotalPriceLabel={generalViewOffer.priceDetails.priceLabel}
                                    currentTotalPricePerMeterLabel={generalViewOffer.priceDetails.pricePerMeterLabel}
                                    additinalLandArea={generalViewOffer?.original?.aboutLand?.area?.area_total}
                                    currentPrice={generalViewOffer.priceDetails.price}
                                    totalArea={generalViewOffer.area.totalArea}
                                    name={generalViewOffer.nameForOfferPage}
                                    pricePerMeter={generalViewOffer.priceDetails.pricePerMeter}
                                />
                            </OfferCard>

                            <OfferCard
                                key={"Описание"}

                                needBottomBorder={true}
                                label={"Описание"}>
                                <OfferDescription description={generalViewOffer?.description?.story} />
                            </OfferCard>

                            {
                                generalViewOffer.videoYoutube
                                && <OfferCard
                                    key="Видео об объекте"
                                    needBottomBorder={true}
                                    label="Видео об объекте">
                                    <iframe
                                        ref={refVideo}
                                        style={{
                                            marginTop: "30px",
                                            border: "1px solid #ccc",
                                            borderRadius: "10px",
                                            boxShadow: "0 0 10px 1px #ccc",
                                        }}
                                        width="90%"
                                        height="90%"
                                        src={offer?.videoYoutube?.replace("watch?v=", "embed/")}
                                        frameBorder="0"

                                        allowFullScreen
                                    >
                                    </iframe>


                                </OfferCard>
                            }
                            <OfferAuthor author={author} authorId={generalViewOffer.userId} />

                            <OfferCard
                                key={Date.now() + "Расположение"}
                                needBottomBorder={true}
                                label={"Расположение"}

                            >

                                <MyMapYa
                                    userId={generalViewOffer?.userId}
                                    author={author}
                                    address={generalViewOffer?.address?.map}
                                    priceLabel={generalViewOffer?.priceDetails?.priceLabel}
                                    addressTitle={generalViewOffer?.titles?.addressTitle}
                                    addressFixedCoords={generalViewOffer?.address?.fixedCoords}
                                    offerTitle={generalViewOffer?.titles?.mainTitle}
                                    firstImg={generalViewOffer?.firstImg}
                                />

                            </OfferCard>


                            <h2 className="mt-30">{"Другие категории"} </h2>
                            <div style={{ fontStyle: "italic" }}>Покрутите</div>
                            <div className={"mb-10" + " opacityByHover"}>
                                <SliderShell
                                    key={"SliderShell2"}
                                    controllButtons_flag={false}>

                                    {dataForSlider.map(
                                        (i, idx) =>
                                            <OfferByCategoryGetter Component={LittleOfferCard} />
                                    )}
                                </SliderShell>
                            </div>


                        </>
            }


        </div>

    )

}

export default OfferContent