import React, { useRef } from "react";
import Content from "../../layouts/MainLayout/components/Content";


import "./tablePage.scss"


import TableList from "./components/TableList";

import Header from "../../layouts/MainLayout/components/Header";

import LongFilters from "../../components/Filters/LongFilters/LongFilters";
import SliderShell from "../../components/ui/Sliders/SliderShell/SliderShell";
import ContentCard from "../../components/Cards/ContentCard";
import { dataForSlider } from "../../data/forSlider";
import LittleOfferCard from "../../components/Cards/LittleOfferCard";
import OfferByCategoryGetter from "../../hocs/OfferByCategoryGetter/OfferByCategoryGetter";



const TablePage = () => {

    const refForScrollToFilters = useRef()



    const refForScrollToOffers = useRef()




    const toScrollToFilters = ({ bySmooth }) => {

        if (refForScrollToFilters.current) {
            if (bySmooth) refForScrollToFilters.current.scrollIntoView({ block: "center", behavior: "smooth" })
            else refForScrollToFilters.current.scrollIntoView({ block: "center" })
        }

    }




    const ShowOffers = () => {

        if (refForScrollToOffers.current) refForScrollToOffers.current.scrollIntoView({ block: "center", behavior: "smooth" })
    }








    return (<>
        <Header
            bannerSizeWhenImgLoading={226}
            title="Купить трехкомнатную квартиру в Москве"
            isBreadcrumb={true}
            bannerLink={"https://avatars.mds.yandex.net/get-realty/1544330/samolet-kupit-msk/banner_1440"}
        >

            <div ref={refForScrollToFilters} className="card TablePage__FiltersWrapper">

                <LongFilters
                    onShowOffersClick={ShowOffers}
                />

            </div>
        </Header>



        <Content>

            <ContentCard>
                <h2>Продающий заголовок</h2>
                <SliderShell>

                    {dataForSlider.map(
                        i =>
                            <OfferByCategoryGetter Component={LittleOfferCard} />
                    )}
                </SliderShell>
            </ContentCard>

            <div ref={refForScrollToOffers}></div>

            <TableList
                toScrollToFilters={toScrollToFilters}
            />
        </Content>

    </>
    )
}

export default TablePage