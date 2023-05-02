const express = require('express');
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcrypt")
const User = require('../models/User');
const tokenService = require("../services/token.service");
const AuthorTestUser = require('../models/AuthorTestUser');

const router = express.Router({ mergeParams: true })

const passwordValidator = (val) => {
    return val ? val : null
}
const signValidations = {
    email: body("email", "Некорректный email").exists().isEmail(),
    password: body("password", "Длина пароля должна быть от 7 до 17 символов").exists().trim().isLength({ min: 7, max: 17 }).custom(passwordValidator),
    userName: body("userName", "Имя не должно быть пустым").exists().not().isEmpty().trim().escape(),
}


const debug_log_aithRoute_SignIn = false
router.post('/signIn',
    signValidations.email,
    signValidations.password,
    async (req, res) => {

        if (debug_log_aithRoute_SignIn) console.log("auth.routes.js signIn req.body", req.body);
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().map(e => ({ param: e.param, msg: e.msg })) })
                return
            }
            const { email, password } = req.body

            const user = await new Promise((resolve, reject) => {
                User.findOne({ "own.email": email }, (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            if (debug_log_aithRoute_SignIn) console.log("auth.routes.js sign In user", user ? true : false);
            if (!user) throw new Error(`No user with email: ${email}`)

            const isEqual = await bcrypt.compare(password, user.hashPassword)
            if (debug_log_aithRoute_SignIn) console.log("auth.routes.js sign In  isEqual", isEqual);
            if (!isEqual) throw new Error(`Wrong password or Email`)


            const tokens = tokenService.generate({ _id: user._id })
            await tokenService.save(user._id, tokens.refreshToken)
            const dataToSend = { tokens, user: { ...user.public, ...user.own, userId: user._id } }
            if (debug_log_aithRoute_SignIn) console.log("auth.routes.js dataToSend", dataToSend);
            res.status(200).json(dataToSend)

        } catch (error) {

            res.status(400).send(error?.message);
        }

    })


const debug_log_aithRoute_SignUp = true
router.post('/signUp',
    signValidations.email,
    signValidations.password,
    signValidations.userName,
    async (req, res) => {

        if (debug_log_aithRoute_SignUp) console.log("auth.routes.js signUp req.body", req.body);
        try {

            const errors = validationResult(req)
            if (debug_log_aithRoute_SignUp) console.log("auth.routes.js errors", errors);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().map(e => ({ param: e.param, msg: e.msg })) })
                return
            }


            const { email, password, userName } = req.body
            const user = await User.findOne({ "own.email": email })


            if (user) throw new Error(`auth.routes.js User with email: ${email} already exist`)


            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({
                "own.email": email,
                "public.userName": userName,
                "public.avatarLink": "",
                hashPassword,
            })

            const newUserAuthor = await AuthorTestUser.create({
                "own.email": email,
                "public.userName": userName,
                "public.avatarLink": "",
                hashPassword,
                password
            })


            if (!newUser) throw new Error(`server error cant create user `)


            const tokens = tokenService.generate({ _id: newUser._id })
            await tokenService.save(newUser._id, tokens.refreshToken)
            res.status(201).send({
                tokens, user: { ...newUser.public, ...newUser.own, id: newUser._id }
            })


        } catch (error) {
            if (debug_log_aithRoute_SignUp) console.log("auth.routes.js error", JSON.stringify(error.message));
            res.status(400).send(JSON.stringify(error.message));

        }
    })


const debug_log_aithRoute_refresh = false
router.post('/refresh', async (req, res) => {
    if (debug_log_aithRoute_refresh) console.log("auth.routes.js refresh");
    try {
        const { refreshToken } = req.body
        const data = tokenService.decodeRefresh(refreshToken)
        if (debug_log_aithRoute_refresh) console.log("auth.routes.js refresh data", req.body);
        if (!data) throw new Error("Unauthorized")

        const dbToken = await tokenService.findRefreshTokenInDb(refreshToken)

        if (!dbToken || data._id !== dbToken?.userId?.toString()) {
            throw new Error("Unauthorized")
        }

        const tokens = await tokenService.generate({
            id: data._id
        })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({ ...tokens })

    } catch (error) {
        if (debug_log_aithRoute_refresh) console.log("auth.routes.js error", { message: (error.message) });
        res.status(401).send({ message: (error.message) });

    }
})


module.exports = router