const setToField = (obj, parentFieldName, fieldName, value) => {
    if (!(obj?.[parentFieldName])) obj[parentFieldName] = {}
    obj[parentFieldName][fieldName] = value

}

const _ = require("lodash")


const parseFromQueryToMongooseFiltersNew = (obj) => {

    console.log("-----parseFromQueryToMongooseFiltersNew BEFORE", obj);

    issues = ["marketType", "clarification", "fullAdditionaly"]



    const mongooseFilters = {}

    const path = { i: [] }
    const mongoFilters_keys_range = ["$gte", "$lte"]

    const deepTransform = (src, key) => {

        const is_includes = mongoFilters_keys_range.includes(key)
        // console.log("is_includes : ", key, ":", is_includes, " at ", src);
        if (mongoFilters_keys_range.includes(key)) {
            let curPath = path.i.slice()

            const oldRangeArr = _.at(mongooseFilters, curPath.join("."))
            const oldRange = oldRangeArr.reduce((acc, i) => {
                if (!Array.isArray(i) && typeof i === "object") {
                    if (i?.$gte) acc = { ...acc, $gte: i?.$gte }
                    if (i?.$lte) acc = { ...acc, $lte: i?.$lte }
                }
                return acc
            }, {})
            console.log("oldRange", oldRange);
            const newRange = oldRange ? { ...oldRange, [key]: typeof src === "string" ? parseFloat(src) : src } : { [key]: typeof src === "string" ? parseFloat(src) : src }
            console.log("newRange", newRange);
            // mongooseFilters[curPath.join(".")] = { [key]: src }
            mongooseFilters[curPath.join(".")] = newRange
            // mongooseFilters[curPath.join(".") + `.${key}`] = typeof src === "string" ? parseFloat(src) : src
            // _.set(mongooseFilters, curPath.join(".") + `.${key}`, typeof src === "number" ? `${src}` : src)
        } else {
            if (key) path.i.push(key)
            if (Array.isArray(src)) {
                let curPath = path.i.slice()
                // mongooseFilters[curPath.join(".") + ".$in"] = src
                mongooseFilters[curPath.join(".")] = { $in: src }
                // _.set(mongooseFilters, curPath.join(".") + `.$in`, src)
            }
        }

        if (!Array.isArray(src) && typeof src === "object") {
            Object.keys(src).forEach(k => {
                if (issues.includes(k)) { }
                else { deepTransform(src[k], k) }
            })

        }

        if (key && path.i.includes(key)) path.i = path.i.filter(i => i !== key)


    }
    deepTransform(obj)


    console.log("-----parseFromQueryToMongooseFiltersNew AFTER", mongooseFilters);
    return { ...mongooseFilters }
}

module.exports = {
    parseFromQueryToMongooseFiltersNew
}


