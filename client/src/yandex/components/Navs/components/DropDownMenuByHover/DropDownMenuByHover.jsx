import { cloneElement, createElement, useEffect, useRef } from "react"

import "./DropDownMenuByHover.scss"

const DropDownMenuByHover = ({ handler, dropdownCenterContent, children }) => {

    const refDropdownCenterContent = useRef()
    const reff = useRef()

    const handlerShow = () => {
        handler({ children, reff })
    }


    const cloned = createElement(dropdownCenterContent.type, { ...dropdownCenterContent.props, ref: reff })

    refDropdownCenterContent.current = dropdownCenterContent


    return (
        <div
            onMouseEnter={() => handlerShow}
            className="dropdown-center-full">

            <div onMouseEnter={handlerShow}>
                {cloned}
            </div>
        </div>
    )
}

export default DropDownMenuByHover