const tokenService = require("../services/token.service")
const debug_log_getAccessTokenFromRequest = false
const getAccessTokenFromRequest = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    const accessToken = req.headers.authorization?.split(' ')?.[1]
    const data = tokenService.decodeAccess(accessToken)
    if (debug_log_getAccessTokenFromRequest) if (!data) console.log("Unauthorized");
    else { req.userTokens = { ...data, userId: data._id, accessToken } }
    next()
}

module.exports = getAccessTokenFromRequest
