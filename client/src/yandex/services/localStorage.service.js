const ACCESS_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-id"
const OFFER_ITEM_KEY = "offer-item"


function setTokens({ refreshToken, accessToken, expiresIn = 3600, userId }) {


    const expiresDate = new Date().getTime() + expiresIn;
    localStorage.setItem(ACCESS_KEY, JSON.stringify(accessToken))
    localStorage.setItem(REFRESH_KEY, JSON.stringify(refreshToken))
    localStorage.setItem(EXPIRES_KEY, JSON.stringify(expiresDate))
    localStorage.setItem(USERID_KEY, JSON.stringify(userId))
}

function SavedGetFrom(key) {
    try {
        const notParsedItem = localStorage.getItem(key)
        const parsedItem = JSON.parse(notParsedItem)
        return parsedItem
    } catch (error) {
        localStorage.removeItem(key)
        return null
    }
}

function getAccessToken() {
    return SavedGetFrom(ACCESS_KEY)
}

function getRefreshToken() {
    return SavedGetFrom(REFRESH_KEY)
}

function getTokenExpiresDate() {
    return SavedGetFrom(EXPIRES_KEY)
}
function getUserId() {
    return SavedGetFrom(USERID_KEY)
}

function getTokens() {

    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const expiresIn = getTokenExpiresDate()
    const userId = getUserId()

    if (accessToken && refreshToken && expiresIn && userId) {
        return { accessToken, refreshToken, expiresIn, userId }
    } else {
        return null
    }

}

function getOfferItem() {
    return SavedGetFrom(OFFER_ITEM_KEY)
}
function setOfferItem(offer) {

    localStorage.setItem(OFFER_ITEM_KEY, JSON.stringify(offer))
}
function removeOfferItem() {
    localStorage.removeItem(OFFER_ITEM_KEY)
}
function removeAllTokens() {

    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(USERID_KEY)
}


const localStorageService = {
    setTokens,
    getTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    getOfferItem,
    setOfferItem,
    removeOfferItem,
    removeAllTokens

}


export default localStorageService