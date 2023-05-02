import AuthExistingService from "../../services/authExisting.service"
import { signOut } from "../auth"

export function logOuter(storeApi) {
    return function wrapDispatch(next) {
        return function handleAction(action) {

            const auth = storeApi.getState
            const is = AuthExistingService.isExisitingAuth(auth)
            if (is) return next(action)
            else {
                return next(action)
            }



        }
    }
}