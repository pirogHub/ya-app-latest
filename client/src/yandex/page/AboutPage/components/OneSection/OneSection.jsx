import React from "react"

import "./OneSection.scss"

const OneSection = ({ title, children }) => {




    return (
        <section className="OneSection">
            <h2 className="OneSection__title">{title}</h2>
            <ul className="OneSection__content">

                {children}
            </ul>
        </section>
    )
}


export default OneSection