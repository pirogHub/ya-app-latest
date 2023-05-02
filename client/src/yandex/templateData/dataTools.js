
const getDefault = (all, enabledList) => {
    const defArr = []
    Object.keys(all).forEach(k => {
        if (enabledList) {
            defArr.push({
                value: all[k].value,
                label: all[k].label,
                isEnabled: enabledList.includes(k) ? true : false
            })
        } else {
            defArr.push({
                value: all[k].value,
                label: all[k].label,
                isEnabled: true
            })
        }
    })
    return defArr
}

const getAvailable = (list, all) => {
    const cats = []
    list.forEach(k => {
        if (all[k]) {
            cats.push({
                value: all[k].value,
                label: all[k].label
            })
        }
    })
    return cats
}


const getAvailableBy = (key, from, by) => {
    const cats = []
    by[key].availableOptions.forEach(k => {
        if (from[k]) {
            cats.push({
                value: from[k].value,
                label: from[k].label
            })
        }
    })
    return cats
}

const getBy_From_Withrules = (byVal, defaultArr, rulesFrom) => {
    let types
    const curByVal = Array.isArray(byVal) && byVal?.[0] ? byVal[0] : byVal
    if (curByVal) {

        types = getAvailableBy(curByVal, defaultArr, rulesFrom)
    } else {
        types = getDefault(defaultArr)
    }

    return types
}

const getCategoriesByType = (type) => {



}

const getLabelByValue = (value, container) => {
    let label = ["null"]

    if (Array.isArray(container)) label = container.filter(i => i.value === value)
    else label = container?.[value[0]]?.label || ["null"]
    return label
}


const getArrWithDisabledItemsBy_From_WithRooles = (byVal, defaultObjList, rulesFrom) => {
    let arr
    if (byVal && byVal?.length && byVal?.[0]) {
        arr = getDefault(defaultObjList, rulesFrom[byVal[0]].availableOptions)
    } else {
        arr = getDefault(defaultObjList)
    }


    return arr
}



const dataTools = {
    getAvailable,
    getDefault,
    getBy_From_Withrules,
    getCategoriesByType,
    getLabelByValue,
    getArrWithDisabledItemsBy_From_WithRooles
}



export default dataTools