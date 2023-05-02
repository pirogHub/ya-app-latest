import axios from "axios"
import config from "../../config.json"
import localStorageService from "./localStorage.service"
import authService from "./auth.services"
const myHttp = axios.create({
    baseURL: config.apiEndpoint,
    params: {

    }
})

const debug_log_myHttp_interceptors = false
myHttp.interceptors.request.use(
    async function (config) {

        if (debug_log_myHttp_interceptors) console.log("myHttp.interceptors.request");
        const tokens = localStorageService.getTokens()
        if (!tokens) return config


        if (!tokens?.refreshToken || !tokens?.accessToken) {
            return config
        }
        const isExpired = tokens.refreshToken && (tokens.expiresIn < Date.now() || !tokens.expiresIn)

        const d = new Date(isExpired)
        if (debug_log_myHttp_interceptors) console.log("myHttp.interceptors.request expiresDate end at", d.toLocaleString());

        if (debug_log_myHttp_interceptors) console.log("myHttp.interceptors.request isExpired", isExpired);
        if (isExpired) {
            const data = await authService.refresh(tokens.refreshToken)
            if (!data) return config
            localStorageService.setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresIn: data.expiresIn,
                userId: data.userId
            })
        }

        const accessToken = localStorageService.getAccessToken()

        if (accessToken) {
            config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` }
        }
        if (debug_log_myHttp_interceptors) console.log("myHttp.interceptors.request accessToken", accessToken);
        if (debug_log_myHttp_interceptors) console.log("myHttp.interceptors.request config.headers", config.headers);
        return config
    },
    function (error) {
        return Promise.reject(error)
    }


)

myHttp.interceptors.response.use(
    async function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default myHttp