import { useEffect } from "react"
import config from "../../../config.json"

const ServerImg = ({ src, ...rest }) => {

    const [changedSrc, setChangedSrc] = useState("")

    useEffect(() => {

        let newSrc = src.replace("http://89.108.76.206/api", config.apiEndpoint)
        newSrc = src.replace("http://89.108.76.206/api", `${config.img_server_string}/api`)
        newSrc = src.replace("api/api", "/api")
        setChangedSrc(newSrc)
    }, [src])

    return <img src={changedSrc} {...rest} />
}

export default ServerImg