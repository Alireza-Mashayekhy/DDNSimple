import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeSlice from '../slice/themeSlice';
import uploadReducer from '@/redux/store/uploadData';
import stockReducer from '@/redux/store/stockData';
import customersReducer from '@/redux/store/customersData';
import feeReducer from '@/redux/store/feeData';
import investmentReducer from '@/redux/store/investmentData';
import authentication from './authentication';
import usersReducer from './users';
import { LOGOUT_USER } from './actions';

const rootReducer = combineReducers({
    theme: themeSlice,
    uploadData: uploadReducer,
    stockData: stockReducer,
    customersData: customersReducer,
    feeData: feeReducer,
    authentication: authentication,
    users: usersReducer,
    investment: investmentReducer,
});
const appReducer = (
    state: any,
    action: { type: string } & Record<string, unknown>
) => {
    if (action.type === LOGOUT_USER) state = undefined;
    return rootReducer(state, action);
};

const persistConfig = {
    key: 'school_oxalisys!!!',
    storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    REHYDRATE,
                ],
            },
        }),
    reducer: persistedReducer,
});
export const persistor = persistStore(store);
