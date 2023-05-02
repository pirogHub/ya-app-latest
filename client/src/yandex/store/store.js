import { logger } from "./middleware/logger";

import filtersReducer from "./filters";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import offersListReducer from "./offersList";
import errorReducer from "./errors";
import componentsStructsReducer from "./componentsStructs";
import authReducer from "./auth";
import themeReducer from "./theme";




const rootReducer = combineReducers({
    errors: errorReducer,
    offersList: offersListReducer,
    filters: filtersReducer,
    componentsStructs: componentsStructsReducer,
    auth: authReducer,
    theme: themeReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(logger)

        ,
        devTools: process.env.NODE_ENV !== 'production',
    })
}

