const jwt = require("jsonwebtoken")
const config = require('config')
const Token = require("../models/Token")

const time = 1000 * 60 * 120 // 2 часа
const stringTime = `${time}ms`

const debug_log_TokenService = false


const ACCESS_SECRET = process.env.ACCESS_SECRET
// const ACCESS_SECRET = config.get('accessSecret')
const REFRESH_SECRET = process.env.REFRESH_SECRET
// const REFRESH_SECRET = config.get('refreshSecret')


class TokenService {
    generate(payload) {

        if (debug_log_TokenService) console.log("Token.service.js generate");
        const accessToken = jwt.sign(payload, ACCESS_SECRET, {
            expiresIn: stringTime
        })
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
            expiresIn: "1d"
        })
        const tokens = {
            accessToken,
            refreshToken,
            expiresIn: time,
            userId: payload._id,
        }

        return tokens
    }


    async save(userId, refreshToken) {
        const data = await Token.findOne({ userId })

        if (data) {
            data.refreshToken = refreshToken
            return data.save()
        }

        const token = await Token.create({ userId, refreshToken })
        return token
    }

    decodeRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    decodeAccess(accessToken) {
        try {
            return jwt.verify(accessToken, ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    async findRefreshTokenInDb(refreshToken) {
        try {
            return await Token.findOne({ refreshToken })
        } catch (e) {
            return null
        }
    }

    async isAuthOwner(refreshToken, userDb) {


        return true
    }
}


module.exports = new TokenService