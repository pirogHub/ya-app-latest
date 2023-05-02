import myHttp from "./http.service";



const imgService = {
    loadImg: async ({ file, type = 'plan', isToRandomDb = false }) => {
        let data = new FormData();
        data.append('file', file, file.name);
        try {
            const response = await myHttp.post(
                `/img/${isToRandomDb ? "random/" : ""}${type}`
                , data
                , {
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
    },


}

export default imgService