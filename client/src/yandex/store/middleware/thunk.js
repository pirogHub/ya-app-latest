import _ from "lodash";

export function thunk(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {

            if (typeof action === "function") {
                action(storeAPI.dispatch, storeAPI.getState)
            } else {

                return next(action)
            }
        }
    }
}

