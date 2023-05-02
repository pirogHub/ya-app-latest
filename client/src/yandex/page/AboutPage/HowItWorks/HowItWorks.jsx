import Highlight from "react-highlight"
import OneSection from "../components/OneSection/OneSection"
import SectionItem from "../components/SectionItem/SectionItem"
import { code_aboutLand } from "../codes/aboutLand"
import { code_landFullStruct } from "../codes/landFullStruct"
import { code_author } from "../codes/author"
import { code_generating } from "../codes/genetation"
import LittlePart from "../components/LittlePart/LittlePart"
import OfferFather from "./components/OfferFather/OfferFather"

export const HowItWorks = () => {


    return (
        <OneSection
            title="Как это работает?"
        >
            <OfferFather />

        </OneSection >
    )
}