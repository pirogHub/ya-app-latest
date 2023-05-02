const express = require("express")
const User = require("../models/User")

const auth = require("../middleware/auth.middleware")
const tokenService = require("../services/token.service")
const { imgParserService, IMGModels_VARIABLES } = require("../services/img.service")
const getAccessTokenFromRequest = require("../middleware/getAccessTokenFromRequest.middleware")
const userService = require("../services/user.service")
const formidable = require('formidable');
const Avatar = require("../models/Avatar")
const router = express.Router({ mergeParams: true })




router.get("/avatar/:imgUrlName",
    async (req, res) => {

        imgParserService.getImg({ imgReqParam_alias: "imgUrlName", req, res, IMGModel_VARIABLE: IMGModels_VARIABLES.AvatarModel })
    })

router.delete("/avatar",
    auth,
    async (req, res) => {
        const userId = req.userTokens?.userId
        try {
            const userDb = await userService.findUserDbByUserId(userId)
            if (!userDb) throw new Error(`No user with id: ${userId}`)

            const oldAvatar = await Avatar.findOne({ userId: userDb._id })
            if (oldAvatar) oldAvatar.remove()
            userDb.public.avatarLink = ""
            await userDb.save()
            res.status(200).send()


        } catch (error) {
            res.status(401).json(error?.message)
        }
    })

//только менять аватарку
router.patch("/avatar",
    auth,
    async (req, res) => {

        try {
            const userId = req.userTokens?.userId
            console.log("userId", userId);
            const userDb = await userService.findUserDbByUserId(userId)
            const userDbAuthor = await new Promise((resolve, reject) => {
                User.findById(userId, (err, res) => {
                    if (err) reject(null)
                    resolve(res)
                })
            })
            if (!userDb) throw new Error(`No user with id: ${userId}`)

            const form = new formidable.IncomingForm();
            if (userDb.public.avatarLink) {
                const oldAvatar = await Avatar.findOne({ userId: userDb._id })
                if (oldAvatar) await oldAvatar.remove()
            }
            const link = await imgParserService.parseLoadAndGetLinkOfImg({ form, req, IMGModel_VARIABLE: IMGModels_VARIABLES.AvatarModel, paramsToModel: { userId: userDb._id } })
            userDb.public.avatarLink = link
            userDbAuthor.public.avatarLink = link
            await userDb.save()

            res.status(200).send(link)




        } catch (error) {
            res.status(401).json(error)
        }
    })


const debug_log_userRoutes_userId = false

router.get("/:userId",
    getAccessTokenFromRequest,
    async (req, res) => {
        const userId = req.params?.userId
        if (debug_log_userRoutes_userId) console.log("get /:userId", req.params);
        let userDataToSend
        try {
            if (userId === "random") {
                if (debug_log_userRoutes_userId) console.log("get random user");
                userDataToSend = await User.aggregate([{ $sample: { size: 1 } }])
            } else {
                const userDb = await userService.findUserDbByUserId(userId)
                if (!userDb) throw new Error(`No user with id: ${userId}`)

                if (
                    req?.userTokens?.accessToken
                    && tokenService.isAuthOwner()
                ) {
                    userDataToSend = { ...userDb.public, ...userDb.own, id: userDb._id }
                }
                else {
                    userDataToSend = { ...userDb.public, userId: userDb._id }
                }

            }
            res.status(200).json({ user: userDataToSend })
        } catch (error) {
            if (debug_log_userRoutes_userId) console.log("user.routes.js user/:userId error" + error);
            res.status(401).json(error?.message)
        }
    })


module.exports = router