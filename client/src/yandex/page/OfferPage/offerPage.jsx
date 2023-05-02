import React from "react";
import OfferContent from "./components/offerContent";
import Content from "../../layouts/MainLayout/components/Content";



const OfferPage = (props) => {

    return (
        <>

            <Content>
                <OfferContent
                    {...props}
                />
            </Content>
        </>
    )
}

export default OfferPage