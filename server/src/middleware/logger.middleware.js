const loggerMiddleware_debug_log = true

const logger = (req, res, next) => {
    const date = new Date(Date.now()).toLocaleString()
    const secondRoute = req.originalUrl?.split("/")?.[2]
    const is_to_imgRoutes = secondRoute === "img" || secondRoute === "user"
    if (
        loggerMiddleware_debug_log
        && !is_to_imgRoutes
    ) console.log("---",
        (date),
        "---",
        req.originalUrl,
        req.method,
        req.headers['x-forwarded-for'] || req.socket.remoteAddress,

    );


    next()
}

module.exports = logger