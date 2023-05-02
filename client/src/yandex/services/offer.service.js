import randomTools from "../templateData/random/randomTools";
import offerTransform from "../utils/offerTransform";
import myHttp from "./http.service";

const categoriesArr = [
    "flat",
    "room",
    "house",
    "garage",
    "commercial",
    "land",
]
const getRandomCategory = () => {
    const randomIdx = randomTools.getRandomNumber(categoriesArr.length - 1, 0, 0)
    const randomCategory = categoriesArr?.[randomIdx]
    return randomCategory
}


const offerService = {
    getByCategoryAndId: async ({ category, id, link }) => {

        let path
        if (link) path = link
        else path = "/" + category + "/" + id
        try {
            const { data } = await myHttp.get('/offer' + path)
            const originalOffer = data?.[0]

            if (!originalOffer) throw new Error("")
            const generalViewOffer = offerTransform.toGeneralView(originalOffer.category, originalOffer)

            return generalViewOffer

        } catch (error) {
            return false
        }
    },
    getByFilters: async ({ filters, from = 0, to }) => {
        try {
            const { data } = await myHttp.post(`/offer/slice?` + filters, { from, to })

            return data

        } catch (error) {
            console.error("Err offerService getByFilters", error);
            throw new Error(error)
        }
    },
    getRandomByCategory: async ({ category }) => {
        try {
            let realCategory = category
            if (!realCategory) {
                realCategory = getRandomCategory()
            }
            const { data } = await myHttp.get(`/offer/${realCategory}/random/${Math.random()}`)

            const originalOffer = data?.[0]

            if (!originalOffer) throw new Error("")
            const generalViewOffer = offerTransform.toGeneralView(originalOffer.category, originalOffer)

            return generalViewOffer
        } catch (error) {
            console.error("Err offerService getRandomByCategory", error);
            return null
        }
    },
    uploadOne: async (offer, type) => {
        try {
            if (!offer || !type) {

                throw new Error("offerService uploadOne need offer and type")
            }
            const { data } = await myHttp.post(`/offer/create/${type}`, JSON.stringify(offer), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            debugger
            return data

        } catch (error) {
            console.error("Err offerService uploadOne", error);
            debugger
            return undefined
        }
    },
    getByUserId: async (userId) => {

        try {
            const { data } = myHttp.get("/offer/byUser/" + userId)
            return data

        } catch (error) {
            return []
        }
    },
    removeOffer: async ({ category, id }) => {

        try {
            const { data } = await myHttp.delete(`/offer/${category}/${id}`)

            return data
        } catch (error) {

            return false
        }
    }



}

export default offerService