
import ServerImg from "../../../../../../components/ServerImg/ServerImg"
import "./ItemAuthor.scss"
const ItemAuthor = ({ author }) => {

    return (
        <>
            < div className="Author__wrapper">
                <div className="Author">
                    <div className={"AuthorImage__image_wrapper" + (author.isDeveloper ? " developerLogo" : "")}>
                        {/* <img className="AuthorImage__image" */}
                        <ServerImg className="AuthorImage__image"
                            alt={author?.userName}
                            src={author?.avatarLink}
                        />
                    </div>
                </div>


                <div className="Author__name">
                    {author?.userName}
                </div>
            </div >

        </>
    )

}
export default ItemAuthor