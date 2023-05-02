
import React from "react";


import "../../../../node_modules/highlight.js/styles/atom-one-dark.css"

import "./AboutPage.scss"

import { WhatImprove } from "./WhatImprove/WhatImprove";
import { HowItWorks } from "./HowItWorks/HowItWorks";



const AboutPage = ({ }) => {






    return (
        <div className="AboutPage__wrapper">
            <div className="col col-content">

                <HowItWorks />

                <WhatImprove />

            </div>


            <div className="col col-map">
                <a href="#howItWorks" className="header_a"></a>
                <a href="#improve" className="header_a"></a>


            </div>
        </div >
    )



}


export default AboutPage