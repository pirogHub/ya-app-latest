
import "./SectionItem.scss"

const SectionItem = ({ title, children }) => {


    return (
        <li className="SectionItem">
            {/* <h3>Объект, описывающий работу с оффером</h3> */}
            <h3> {title}</h3>
            <div className="SectionItem__body">
                {/* <h4 className="SectionItem__title">

                    {title}

                </h4> */}
                <div className="SectionItem__content">
                    {children}
                </div>
            </div>
        </li>
    )
}

export default SectionItem