const tokenService = require("../services/token.service")

const authMiddleware_debug_log = false

const auth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    if (authMiddleware_debug_log) console.log("auth.middleware.js");
    try {
        const accessToken = req.headers.authorization.split(' ')?.[1]
        if (authMiddleware_debug_log) console.log("auth.middleware.js accessToken", accessToken);
        if (!accessToken) return res.status(401).send("Unauthorized")

        const data = tokenService.decodeAccess(accessToken)
        if (authMiddleware_debug_log) console.log("auth.middleware.js data", data);
        if (!data || !data?._id) return res.status(401).send("Unauthorized")
        req.userTokens = { ...data, userId: data._id, accessToken }
        next()

    } catch (error) {
        return res.status(500).send("Server Error. May be you are Unauthorized")

    }

}

module.exports = auth
