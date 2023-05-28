import { useEffect, useState } from "react";
import ServerImg from "../ServerImg/ServerImg";
import { imgPathReplace } from "../../utils/imgPathReplace";

const ImageLoader = ({ className, onLoaded, link, children, whenBadFetchComponent, ...rest }) => {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (!link || url) { return }

        fetch(imgPathReplace(link))
            .then(response => response.blob())
            .then((image) => {
                setUrl(URL.createObjectURL(image));
                if (onLoaded) onLoaded()
            }).catch(err => setUrl(false))

        return () => {
            URL.revokeObjectURL(url)
        }
    });

    return <>
        {url
            ? < ServerImg
                //  img
                className={className ? ` ${className}` : ""}
                src={url}
                {...rest}
            />
            :
            url === null ? <>{children}</>
                : whenBadFetchComponent ? whenBadFetchComponent : <>{children}</>
        }
    </>
}

export default ImageLoader