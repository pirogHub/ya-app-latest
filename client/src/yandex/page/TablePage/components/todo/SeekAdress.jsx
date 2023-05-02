import React from "react";
import AOoptionCard from "../../../../components/Cards/AOoptionCard";
import OptionButton from "../../../../components/Cards/OptionButton";
import DividerVertical from "../../../../components/Inputs/dividers/DividerVertical";
import FilterItem from "../../../../components/searchComponents/filtersForm/filterItem";
import Seeker from "../../../../templateData/dataSeeker";
import { inputViews } from "../../../../components/Cards/AOoptionCard/AOoptionCard";
import GenRadioCheckboxWrapperWithState from "../../../../components/Inputs/GenRadioCheckboxWrapperWithState";
import FormGroup from "../../../../components/FormComponents/FormGroup";
import FormRow from "../../../../components/FormComponents/FormRow";


const SeekAdress = ({ prarentFormState, name, onChange, randomState, clearFlag, toggleRandom }) => {
    const curName = name ? name : ""


    const handler = onChange
    const formState = prarentFormState
    return (
        <FormGroup
            className="offer-form-group offer-form-group_type_category"
            label="Расположение"
        >
            <FormRow label="Указать на карте" >
                <AOoptionCard {...{ label: "Нарисовать область", value: "draw", handler: handler, view: inputViews.button }} />
            </FormRow>

            <FormRow label="Время до метро" >
                <FilterItem gridCol="figc-4">
                    <GenRadioCheckboxWrapperWithState
                        name="subwayWay"
                        type="radio"
                        formState={curName ? formState?.[curName] : formState}
                        optionsList={Seeker.Options.subwayWay}
                        Component={OptionButton}
                        componentConfig={{}}
                        onChange={handler}

                        noOptionsWrapper={true}
                        DividerComponent={DividerVertical}
                        notEmpty={true}
                        randomState={curName ? randomState?.[curName] : randomState}
                        toggleRandom={toggleRandom}

                    />
                </FilterItem>
                <GenRadioCheckboxWrapperWithState
                    name="subwayTime"
                    type="radio"
                    formState={curName ? formState?.[curName] : formState}
                    optionsList={Seeker.Options.subwayTime}
                    componentConfig={{ view: inputViews.button }}
                    onChange={handler}
                    randomState={curName ? randomState?.[curName] : randomState}
                    toggleRandom={toggleRandom}
                />
            </FormRow>
        </FormGroup>

    )
}

export default SeekAdress