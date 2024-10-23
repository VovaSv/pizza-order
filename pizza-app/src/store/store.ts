import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { UserState, userReducer } from "./slices/userSlice";
import { CartState, cartReducer } from "./slices/cartSlice";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { userTransform } from "./transforms/userTransform";

/*
export type RootState = {
    user: UserState; // Define the structure of your root state
};
*/

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['user', 'cart'], // Only persist the someSlice state
    transforms: [userTransform]
};

// 3. Combine your reducers
const rootReducer = combineReducers({
    user: userReducer, // Add more slices if needed
    cart: cartReducer
});

// 4. Create the persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: {
        serialize: {
            options: {
                undefined: true // without this data with undefined values will not show in devtools
            }
        }
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these redux-persist actions from serializable checks
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),

})


export const persistor = persistStore(store);
//export type RootState = ReturnType<typeof store.getState>; cause for cercular dependency
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;