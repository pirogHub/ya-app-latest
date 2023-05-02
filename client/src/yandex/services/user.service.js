import myHttp from "./http.service";


const AVATAR_METHODS = {
    post: "post",
    patch: "patch"
}


const avatarManipulator = async (file, method) => {
    let data = new FormData();
    data.append('file', file, file.name);
    try {
        const response = await myHttp[method](`/user/avatar`, data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })

        const myLink = response.data
        if (!myLink) throw new Error("ERRRR imgService loadImg")
        return Promise.resolve(myLink)

    } catch (error) {
        return Promise.reject(false)
    }
}


const userService = {
    getUserById: async (userId) => {
        try {
            const { data } = await myHttp.get(`/user/${userId}`)
            const { user } = data
            return user
        } catch (error) {
            return null
        }
    },
    patchAvatar: async ({ file }) => await avatarManipulator(file, AVATAR_METHODS.patch),
    removeAvatar: async () => {
        try {
            await myHttp.delete(`/user/avatar`)
            return null

        } catch (error) {
            return false
        }
    },
    getRandomUser: async () => {
        try {
            const { data } = await myHttp.get(`/user/random`)
            const { user } = data

            return user?.[0]

        } catch (error) {
            return false
        }
    },
}


export default userService