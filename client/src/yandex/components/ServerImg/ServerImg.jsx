import { useEffect, useState } from "react"
import config from "../../../config.json"

const ServerImg = ({ src, ...rest }) => {

    const [changedSrc, setChangedSrc] = useState("")

    useEffect(() => {

        console.log("typeof src", typeof src);
        console.log("src", src);

        if (typeof src === "string") {

            let newSrc = src.replace("http://89.108.76.206/api", config.apiEndpoint)
            console.log("newSrc", newSrc);
            newSrc = src.replace("http://89.108.76.206/api", `${config.img_server_string}/api`)
            console.log("newSrc", newSrc);
            newSrc = src.replace("api/api", "/api")
            console.log("newSrc", newSrc);
            setChangedSrc(newSrc)
        }
    }, [src])

    return <img src={changedSrc} {...rest} />
}

export default ServerImg