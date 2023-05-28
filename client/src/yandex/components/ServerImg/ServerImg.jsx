import { useEffect, useState } from "react"
import config from "../../../config.json"

const ServerImg = ({ src, isDebug, ...rest }) => {

    const [changedSrc, setChangedSrc] = useState("")

    useEffect(() => {
        // if (isDebug) console.log("============");
        // if (isDebug) console.log("typeof src", typeof src);
        // if (isDebug) console.log("src", src);

        if (typeof src === "string") {

            let newSrc = src.replace("http://89.108.76.206/api", config.apiEndpoint)
            // if (isDebug) console.log("newSrc", newSrc);
            newSrc = newSrc.replace(`${config.img_server_string}`, `${config.apiEndpoint}`)
            // if (isDebug) console.log("newSrc", newSrc);
            newSrc = newSrc.replace("api/api", "/api")
            // if (isDebug) console.log("newSrc", newSrc);
            setChangedSrc(newSrc)
        }
    }, [src])

    return <img src={changedSrc} {...rest} />
}

export default ServerImg