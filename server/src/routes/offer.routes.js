const express = require("express")
const _ = require("lodash")
const router = express.Router({ mergeParams: true })

const auth = require("../middleware/auth.middleware")

const { parseFromQueryToMongooseFiltersNew } = require("../../utils/parseFromQueryToMongooseFilters")
const allCategories = require("../structs/allCategories")
const getAccessTokenFromRequest = require("../middleware/getAccessTokenFromRequest.middleware")
const userService = require("../services/user.service")
const { getTitles } = require("../structs/getSchemaAndRandom")

const mySlicer = ({ data, from, to }) => {
    console.log("from", from, "to", to, " ", Array.isArray(data), " ",);
    const newData = data.slice(from, to)
    const realFrom = from
    const realTo = from + newData.length
    return [newData, realFrom, realTo]
}

const dataOnlyCount = (dataArray) => {
    const data = {
        allCount: dataArray?.length ? dataArray?.length : 0,
    }
    return data
}

const dataSlice = (dataArray, from, to,) => {

    const data = {
        from,
        to,
        allCount: dataArray?.length ? dataArray?.length : 0,
        offersSlice: mySlicer({ data: tmp, from, to })
    }
    return data
}
const debugScrollArray = []
for (let i = 0; i < 189; i++) debugScrollArray.push(`${i} ${Date.now()}`)

const debug_log_offerRouter_slice = false
router.post('/slice', async (req, res) => {
    if (debug_log_offerRouter_slice) console.log("offer.routes.js /slice")


    let category = undefined
    let filters = undefined
    let mongooseMethod = undefined
    const { from, to } = req.body
    const curFrom = from ? from : 0
    const curTo = to ? to : undefined

    try {
        category = JSON.parse(req.query?.category)
        filters = parseFromQueryToMongooseFiltersNew(JSON.parse(req.query?.filters))
        mongooseMethod = "find"
        const curOfferModel = _.at(allCategories.categories, category + ".mongo.mongoModel")[0]
        if (!curOfferModel) {
            if (debug_log_offerRouter_slice) console.log("offer.routes.js !curOfferModel");
            res.status(400).end(`server Error. Cant find MongoModel with name <${category}>`)
            return
        }

        if (debug_log_offerRouter_slice || true) console.log("get by filters: ", filters)


        curOfferModel[mongooseMethod](
            filters
            // type: { '$in': ['sell'] },
            // category: { '$in': ['room'] },
            // marketType: { '$in': ['new'] },
            // 'aboutBuilding.parking': { '$in': ['closed'] }
            , function (err, dataArray) {
                if (!err) {
                    const tmp = Array.isArray(dataArray) ? dataArray : [dataArray]
                    console.log("offers length", tmp.length);
                    const [offersSlice, realFrom, realTo] = mySlicer({ data: tmp, from: curFrom, to: curTo })
                    if (debug_log_offerRouter_slice) console.log("offersSlice.length", offersSlice.length);
                    const data = {
                        from: realFrom,
                        to: realTo,
                        allCount: tmp?.length ? tmp?.length : 0,
                        offersSlice
                    }
                    res.status(200).send(data)
                    res.end()
                } else throw new Error(err)
            })

    } catch (error) {
        if (debug_log_offerRouter_slice || true) console.log(`offer.routes.js get:/ error ${error} `);
        res.status(500).json({
            message: `Server Error. Try later. Error: ${error}`
        })
        res.end()
    }


})

const debug_log_offerRouter_randomOffer = false

router.get('/:category?/:id?/:randomNumForAntiOptimizedReactRequests?', async (req, res) => {
    if (debug_log_offerRouter_randomOffer) {

        console.log("offer.routes.js get/offers params:", req.params);
        console.log("offer.routes.js get/offers " + req.params.category + " " + req.params.id + " " + new Date(Date.now()).toLocaleTimeString());
    }
    let category = undefined

    try {

        category = req.params.category
        const offerId = req.params.id


        const curOfferModel = _.at(allCategories.categories, category + ".mongo.mongoModel")[0]
        if (!curOfferModel) {
            console.log("offer.routes.js !curOfferModel");
            res.status(400).end(`server Error. Cant find MongoModel with name <${category}>`)
            return
        }

        let entries = undefined
        if (offerId === "random") {
            if (debug_log_offerRouter_randomOffer) console.log("get random offer");
            entries = await curOfferModel.aggregate([{ $sample: { size: 1 } }])
        } else {
            entries = await curOfferModel.findById(offerId).lean()
        }
        const toSend = Array.isArray(entries) ? entries : [entries]
        res.status(200).send(toSend)

    } catch (error) {
        if (debug_log_offerRouter_randomOffer) console.log(`offer.routes.js get:/ error ${error} `);
        res.status(400).json({
            message: `Server Error. Try later. Error: ${error}`
        })
        res.end()
    }


})


const debug_log_offerRouter_createOffer = true
router.post('/create/:category',
    auth,
    async (req, res) => {


        const category = req.params.category
        const curOfferModel = _.at(allCategories.categories, category + ".mongo.mongoModel")[0]

        if (!curOfferModel) {
            if (debug_log_offerRouter_createOffer) console.log("offer.routes.js !curOfferModel");
            res.status(400).end(`server Error. Cant find MongoModel with name <${category}>`)
            return
        }

        try {
            const userDb = await userService.findUserDbByUserId(req?.userTokens?.userId)
            if (!userDb) throw new Error(`No user with id: ${req.params?.userId}`)

            const offer = req.body

            let mainTitle = offer?.FullServiceInfo?.titles?.mainTitle
            let additionalTitle = offer?.FullServiceInfo?.titles?.additionalTitle
            let additionalTitleWithLink = offer?.FullServiceInfo?.titles?.additionalTitleWithLink


            if (!mainTitle
                || !additionalTitle
                || (additionalTitleWithLink?.isExist !== true || additionalTitleWithLink?.isExist !== false)
            ) {

                const [newMainTitle, newAdditionalTitle, newAdditionalTitleWithLink] = getTitles(offer.category[0], offer)
                mainTitle = mainTitle ? mainTitle : newMainTitle
                additionalTitle = additionalTitle ? additionalTitle : newAdditionalTitle
                additionalTitleWithLink = additionalTitleWithLink ? additionalTitleWithLink : newAdditionalTitleWithLink
            }
            const newOffer = new curOfferModel({ ...offer, FullServiceInfo: { titles: { ...offer.FullServiceInfo.titles, mainTitle, additionalTitle } } })
            newOffer.userId = req.userTokens.userId
            if (debug_log_offerRouter_createOffer) {

                console.log("offer.routes.js curOfferModel", curOfferModel);
                console.log("offer.routes.js  newOffer", newOffer);
            }
            const err = await newOffer.save()

            userDb.public.offerList.push(`/${category}/${newOffer._id}`)
            userDb.save()
            if (debug_log_offerRouter_createOffer) console.log("offer.routes.js post: '/create' offer created");
            res.status(201).send(`/${category}/${newOffer._id}`)
            res.end()
        } catch (error) {
            if (debug_log_offerRouter_createOffer) console.log("offer.routes.js  post: '/' offer error", error);
            res.status(400).send(error)
            res.end()
        }
    })


router.patch("/update/:id", auth, (req, res) => {


    res.status(201).send("Patched")
})


const debug_log_offerRouter_delete = true
router.delete("/:category/:id",
    auth,
    async (req, res) => {
        const category = req.params.category
        const offerId = req.params.id
        if (debug_log_offerRouter_delete) console.log(`delete /: ${category} /: ${offerId}`);
        const userId = req.userTokens?.userId
        if (!userId) throw new Error("Unauthorized")

        const curOfferModel = _.at(allCategories.categories, category + ".mongo.mongoModel")[0]
        if (!curOfferModel) {
            if (debug_log_offerRouter_delete) console.log("offer.routes.js !curOfferModel");
            res.status(400).end(`server Error. Cant find MongoModel with name <${category}>`)
            return
        }

        try {

            const curOffer = await curOfferModel.findById(offerId)
            if (!curOffer) throw new Error(`No offer with id: ${offerId}`)

            const userDb = await userService.findUserDbByUserId(userId)
            if (!userDb) throw new Error(`No user with id: ${userId}`)
            const offerLink = `/${category}/${offerId}`

            if (debug_log_offerRouter_delete) {
                console.log("userDb:")
                console.log("--name: ", userDb.public.userName);
                console.log("--id  : ", userDb._id);
                console.log("userDb offerList BEFORE", userDb.public.offerList);
                console.log("Offer to remove: ");
                console.log("--offer owner Id: ", curOffer.userId.toString());
            }
            const is_Exist = !!curOffer.userId.toString() && !!userId
            const is_Owner_by_offer = curOffer.userId.toString() === userId
            const is_Owner_by_user = userDb?.public?.offerList?.includes(offerLink)
            if (debug_log_offerRouter_delete) {
                console.log("is_Exist", is_Exist);
                console.log("is_Owner_by_offer", is_Owner_by_offer);
                console.log("is_Owner_by_user", is_Owner_by_user);
            }
            if (
                is_Exist
                && is_Owner_by_offer
                && is_Owner_by_user
            ) {

                userDb.public.offerList = userDb.public.offerList.filter(l => l !== offerLink)
                if (debug_log_offerRouter_delete) console.log("userDb offerList After", userDb.public.offerList);
                await userDb.save()
                await curOffer.remove()

                if (debug_log_offerRouter_delete) console.log("offer removed");
                res.status(201).send("Removed")
                return
            }
            throw new Error("Unauthorized")
        }
        catch (e) {
            if (debug_log_offerRouter_delete) console.log("delete offer Error: ", e);
            res.status(401).send()
        }
    })

router.get("/byUser/:userId", (req, res) => {

})


module.exports = router