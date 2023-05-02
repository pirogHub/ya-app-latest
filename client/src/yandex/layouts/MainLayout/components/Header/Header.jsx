import React, { useEffect, useRef } from "react";
import HeaderBanner from "../../../../page/TablePage/components/HeaderBanner";
import PageTitle from "../../../../components/breadcrumbs/PageTitle/PageTitle";
import Breadcrumb from "../../../../components/breadcrumbs/breadcrumb";

import "./Header.scss"

const Header = ({
    bannerSizeWhenImgLoading,
    isContentAtCenter,
    bannerLink,
    isBreadcrumb,
    title, isTitleCenter, isTitleRight,
    children }) => {

    const refImgPlug = useRef()
    const refHeaderWrapper = useRef()
    const refContent = useRef()

    useEffect(() => {

        if (refImgPlug.current) refImgPlug.current.style.height = `${refContent.current.clientHeight + 20}px`
        if (refContent.current) refContent.current.style.bottom = 0
        if (!isContentAtCenter && refContent.current) {
            refContent.current.style.marginTop = "-170px"
        }

    }, [])


    return (
        <div
            ref={refHeaderWrapper}
            className="Header__wrapper"
        >

            <>
                <div className="Header__banner-wrapper">
                    <HeaderBanner
                        bannerLink={bannerLink}
                        bannerSizeWhenImgLoading={bannerSizeWhenImgLoading}
                    >
                        <div
                            ref={refImgPlug}
                            className="img__plug"
                        ></div>

                    </HeaderBanner>
                </div>

                <div className={"Header__content-wrapper" + (isContentAtCenter ? " absolute" : "")}
                    ref={refContent}
                >

                    {isBreadcrumb && <Breadcrumb />}

                    <PageTitle
                        isTitleCenter={isTitleCenter}
                        isTitleRight={isTitleRight}
                        title={title}
                    />

                    <div className="Header__usefullContent">

                        {children}

                    </div>


                </div>
            </>


        </div>
    )
}

export default Header