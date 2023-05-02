const thousandDelimeter = (valStringOrNum, spacesCounter) => {
    let val = ""
    if (typeof valStringOrNum === "number") {
        val = `${valStringOrNum}`
    } else if (typeof valStringOrNum === "string") {
        val = valStringOrNum.replaceAll(" ", "")
    }
    if (val !== undefined && val.length && typeof val === "string") {

        let newSpacesCount = val.match(/\s/g)
        newSpacesCount = newSpacesCount ? newSpacesCount.length : 0
        const str = val.replaceAll(" ", "")
        let formattedStr = ""
        const len = str.length
        const residue = len % 3
        formattedStr = residue ? str.slice(0, residue) : ""
        const toFormat = str.slice(residue, len)
        const count = (toFormat.length) / 3
        for (let i = 0; i < count; i++) {
            const tmp = toFormat.slice(i * 3, (i + 1) * 3)
            formattedStr += " " + tmp
        }
        const spacesDiff = newSpacesCount - spacesCounter
        let lastMagic = formattedStr.trimStart()
        lastMagic = lastMagic.replaceAll(" .", ".")
        lastMagic = lastMagic.replaceAll(". ", ".")
        return {
            formattedString: lastMagic,
            newSpacesCount: newSpacesCount,
            positionDiff: spacesDiff
        }

    }
    return {
        formattedString: "",
        newSpacesCount: spacesCounter,
        positionDiff: 0
    }
}

const postfixMlnCreator = (str) => {
    try {
        let curStr = typeof str === "number" ? `${str}` : str
        let minus = curStr.indexOf("-") === -1 ? "" : "-"
        curStr = curStr.replaceAll(" ", "")
        curStr = curStr.replaceAll("-", "")
        curStr = curStr.split(".")[0]
        curStr = thousandDelimeter(curStr).formattedString
        let arrStr = curStr.split(" ")
        arrStr.reverse()
        let newString = str
        const len = arrStr.length
        switch (len) {

            case 1:
                newString = str

                break;
            case 2:
                newString = arrStr[1] + " " + arrStr[0]
                break;
            case 3:
                newString = arrStr[2] + "," + arrStr[1].slice(0, 2) + " млн"
                break;
            case 4:
                newString = arrStr[3] + "," + arrStr[2].slice(0, 2) + " млрд"
                break;
            default:
                newString = curStr.slice(4).join(" ") + "," + arrStr[3].slice(0, 2) + " млрд"
                break;
        }

        return minus + newString

    } catch (error) {
        return str
    }

}

const thousandDelimeterFromStringOrNumber = (smth) => {
    let newSmth
    if (typeof smth === "number") {
        newSmth = `${smth}`
    } else if (typeof smth === "string") {
        newSmth = smth.replaceAll(" ", "")
    }
    newSmth = thousandDelimeter(newSmth).formattedString
    return newSmth
}

export { thousandDelimeter, postfixMlnCreator, thousandDelimeterFromStringOrNumber }