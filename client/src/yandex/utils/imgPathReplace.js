import config from "../../config.json"

export const imgPathReplace = (src) => {
    if (typeof src === "string") {

        let newSrc = src.replace("http://89.108.76.206/api", config.apiEndpoint)
        // if (isDebug) console.log("newSrc", newSrc);
        newSrc = newSrc.replace(`${config.img_server_string}`, `${config.apiEndpoint}`)
        // if (isDebug) console.log("newSrc", newSrc);
        newSrc = newSrc.replace("api/api", "/api")
        // if (isDebug) console.log("newSrc", newSrc);
        return newSrc
    }



    return src
}