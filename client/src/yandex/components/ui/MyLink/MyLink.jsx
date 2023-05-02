import { Link, NavLink } from "react-router-dom"

import "./MyLink.scss"
import { forwardRef, useState } from "react"


const MyLink = forwardRef(({
    isOpacity07,
    isLinkWrapperW100,
    isOnlyToDisabled,
    isNavLink,
    activeClassName,
    isDisabled,
    isCursorNotAllowed,
    isDarkWarning,
    isBottomWarning,
    className,
    label,
    wrapperClassName,
    children,
    isWithoutWarning,
    isInline,
    ...rest
}, ref) => {


    const [isShowDeepDevelopment, setIsShowDeepDevelopment] = useState(false)
    let to = {
        pathname: "/",
        search: ""
    }

    if (typeof rest.to === "string") {
        to = {
            pathname: rest.to,
            search: ""
        }
    } else if (typeof rest.to === "object") {
        to = {
            pathname: "/courses",
            search: "", ...rest.to
        }
    }

    const isDeepDevelopment = isDisabled || isCursorNotAllowed

    const CurLinkComponent = isNavLink ? NavLink : Link

    return (
        <div
            ref={ref}
            onMouseEnter={isDeepDevelopment ? () => setIsShowDeepDevelopment(true) : undefined}
            onMouseLeave={isDeepDevelopment ? () => setIsShowDeepDevelopment(false) : undefined}
            className={
                "linkWrapper"
                + (wrapperClassName ? ` ${wrapperClassName}` : "")
                + (isInline ? ` isInline` : "")
                + (isLinkWrapperW100 ? ` isLinkWrapperW100` : "")

            }
        >
            {isDeepDevelopment && isShowDeepDevelopment && !isWithoutWarning &&
                <div className={
                    "deepDevelopment"
                    + (isShowDeepDevelopment ? " show" : "")
                    + (isDarkWarning ? " dark" : "")
                    + (isBottomWarning ? " bottom" : "")
                }
                >Функция находится в глубокой разработке</div>
            }
            <CurLinkComponent
                activeClassName={activeClassName}
                className={
                    "defaultLinkClass"
                    + (className ? ` ${className}` : "")
                    + (isDisabled ? " disabled" : "")
                    + (isCursorNotAllowed ? " cursorNotAllowed" : "")
                    + (isOpacity07 ? " isOpacity07" : "")
                }
                {...rest}
                to={isDisabled || isOnlyToDisabled ? undefined : to}
            >

                {children ? children : label}
            </CurLinkComponent>
        </div>
    )

})

export default MyLink