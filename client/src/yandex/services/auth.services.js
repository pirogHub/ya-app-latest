
import axios from "axios";
import config from "../../config.json"


const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth"
})

const debug_log_myHttp_authservices = false


const authService = {
    signUp: async ({ email, password, userName }) => {
        if (debug_log_myHttp_authservices) console.log("auth.services signUp with", email, password, userName);
        try {
            const { data } = await httpAuth.post("/signUp", { email, password, userName })
            if (debug_log_myHttp_authservices) console.log("auth.services signUp  received:", data);

            return data
        } catch (error) {
            return { error: error?.message }

        }
    },
    signIn: async ({ email, password }) => {
        if (debug_log_myHttp_authservices) console.log("auth.services signIn with", email, password);
        try {
            const { data } = await httpAuth.post("/signIn", { email, password })

            if (debug_log_myHttp_authservices) console.log("auth.services signUp  received:", data);
            return data
        } catch (error) {
            if (debug_log_myHttp_authservices) console.log("auth.services signIn error", error);
            return { error: error?.message }

        }
    },
    refresh: async (refreshToken) => {


        try {
            const { data } = await httpAuth.post("/refresh", { refreshToken })

            return data
        } catch (error) {

            return null

        }
    }
}



export default authService