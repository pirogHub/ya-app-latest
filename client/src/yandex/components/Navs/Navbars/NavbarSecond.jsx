import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./NavbarSecond.scss"
import "./navbars.scss"
import NavBarList from "./NavBarList";
import DropDownMenuByHover from "../components/DropDownMenuByHover";

import ThemeController from "../../../layouts/MainLayout/components/ThemeController/ThemeController";
import MyLink from "../../ui/MyLink";


const arrForLinks = [1, 2, 3, 4]
const ConteinerWithLinks = forwardRef(({ labelForLinks }, ref) => {


    return <div ref={ref} className="links_container">
        {arrForLinks.map(i =>
            <MyLink
                isCursorNotAllowed={true}
                isOnlyToDisabled={true}
                isWithoutWarning={true}
                isLinkWrapperW100={true}
                className="nav-link link-black badge-hovered"
                aria-current="page"
                href="/">
                {labelForLinks}
            </MyLink>

        )}
    </div>
})


const NavbarSecond = () => {

    const refMenu = useRef()
    const [showedChildren, setShowedChildren] = useState()
    let refLink = useRef()

    const handlerShow = ({ children, reff }) => {


        if (refLink.current) refLink.current.classList.remove("active")
        if (reff.current) reff.current.classList.add("active")
        refLink.current = reff.current

        setShowedChildren(children)
    }

    useEffect(() => {
        if (showedChildren) refMenu.current.classList.add("DroppedMenu__menu-show")
        if (!showedChildren) refMenu.current.classList.remove("DroppedMenu__menu-show")
    }, [showedChildren])

    const handleMouseLeave = () => {
        setShowedChildren(undefined)
        if (refLink.current) refLink.current.classList.remove("active")
    }

    return (
        <nav className="sec-navbar">
            <div
                onMouseLeave={handleMouseLeave}
                className="navbar-wrapper-columns">
                <div className="navbar__wrapper NavBar__wrapper">
                    <div className="second-navbar">
                        <div
                            className="sec_navbar-container">

                            <NavBarList>
                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <MyLink
                                            isOnlyToDisabled={true}
                                            isCursorNotAllowed={true}
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            Купить
                                        </MyLink>
                                    }>
                                    <ConteinerWithLinks
                                        labelForLinks={"Купить"}
                                    />
                                </DropDownMenuByHover>

                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <MyLink
                                            isDisabled={true}
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            Снять
                                        </MyLink>
                                    }>
                                    <ConteinerWithLinks labelForLinks={"Снять"} />
                                    <ConteinerWithLinks labelForLinks={"Снять"} />
                                    <ConteinerWithLinks labelForLinks={"Снять"} />

                                </DropDownMenuByHover>

                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <MyLink
                                            isDisabled={true}
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            Новостройки
                                        </MyLink>
                                    }>
                                    <ConteinerWithLinks labelForLinks={"Новостройки"} />
                                    <ConteinerWithLinks labelForLinks={"Новостройки"} />

                                </DropDownMenuByHover>

                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <MyLink
                                            isDisabled={true}
                                            className="nav-link"
                                            aria-current="page"
                                        >
                                            Коммерческая
                                        </MyLink>
                                    }>
                                    <ConteinerWithLinks labelForLinks={"Коммерческая"} />
                                    <ConteinerWithLinks labelForLinks={"Коммерческая"} />

                                </DropDownMenuByHover>

                            </NavBarList>



                        </div>
                        <div className="sec_navbar-container">
                            <NavBarList>
                                <MyLink

                                    isNavLink={true}
                                    activeClassName={"active"}
                                    className={"nav-link"}
                                    label={"Домой"}
                                    exact
                                    to={"/"}
                                />
                                <MyLink
                                    isNavLink={true}
                                    activeClassName={"active"}
                                    className={"nav-link"}
                                    label={"К фильтрам"}
                                    exact
                                    to={"/table"}
                                />
                                <MyLink
                                    isNavLink={true}
                                    className={"nav-link"}
                                    label={"Случайный пользователь"}
                                    exact
                                    to={"/random/user"}
                                />
                                <MyLink
                                    isNavLink={true}
                                    className={"nav-link"}
                                    label={"Случайное объявление"}
                                    exact
                                    to={"/random/offer"}
                                />
                            </NavBarList>
                        </div>


                        {/* <ThemeController /> */}

                    </div>
                </div>
                <div className="DroppedMenu__wrapper">

                    <div ref={refMenu} className="DroppedMenu__menu" >
                        <hr className="dropdown-divider" />
                        <div className="navbar__wrapper NavBar__wrapper">
                            <div className="sec-navbar_toggledContent">
                                <div className="toggledContent_content">{showedChildren}</div>
                                <div className="toggledContent_add"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default NavbarSecond