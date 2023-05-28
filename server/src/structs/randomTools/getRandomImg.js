const Random_Plan = require("../../models/randoms/randomPlanSchema")
const Random_Img = require("../../models/randoms/randomImgSchema")
const config = require("config")

const ArrayList = require("arraylist")
const indexesArr = []
const addIndexes = (count) => {
    for (let i = indexesArr.length; i < count; i++) {
        indexesArr.push(i)
    }
}

const alreadyFetchedRandomImgs = {
    plan: {
        expiresIn: 0,
        content: []
    },
    photo: {
        expiresIn: 0,
        content: []
    }
}


const debug_log_getRandomImg = false
const SERVER_URL = process.env.SERVER_URL
// const SERVER_URL = config.get('serverUrl')

const getRandomImg = async (type = "photos", getOne = false) => {

    const resultArr = []
    const path = (type === "plan") ? "plan" : "photo"

    const curSchema = type === "plan" ? Random_Plan : Random_Img

    try {

        if (
            !alreadyFetchedRandomImgs?.[path]?.content?.length
            || alreadyFetchedRandomImgs?.[path]?.expiresIn < Date.now()
        ) {
            const entities = await curSchema.find()


            if (!Array.isArray(entities)) {
                alreadyFetchedRandomImgs[path].content = [entities.name]
            } else {

                alreadyFetchedRandomImgs[path].content = entities.map(i => i.name)
            }


            alreadyFetchedRandomImgs[path].expiresIn = Date.now() + 1000 * 60 * 60 * 24

        }

        const docsCount = alreadyFetchedRandomImgs?.[path]?.content?.length

        if (indexesArr.length < docsCount) addIndexes(docsCount)
        const list = new ArrayList
        list.add(indexesArr.slice(0, docsCount))

        if (type === "plan") {
            randomCount = Math.floor(Math.random() * (4 - 1) + 1)
        } else {
            randomCount = Math.floor(Math.random() * (10 - 5) + 5)
        }
        const condition = (i) => {
            if (getOne) return i < 1
            else return i < randomCount && i < docsCount
        }
        for (let i = 0; condition(i); i++) {

            var random = Math.floor(Math.random() * (list.size() - 1))
            const randomIdx = list.get(random)
            list.remove(random)





            const name = alreadyFetchedRandomImgs[path].content[randomIdx]
            const link = `${SERVER_URL}/api/img/random/${type}/${name}`


            if (!resultArr.includes(link)) resultArr.push(link)

        }

    }
    catch (e) {

        if (debug_log_getRandomImg) console.log("getRandomImg ERRRORORR", e);
        return []
    }




    if (debug_log_getRandomImg) console.log("getRandomImg success for ", type);
    return resultArr
}

module.exports = getRandomImg