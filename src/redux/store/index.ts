import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {loadingReducer} from '../slice/authSlice';



const rootReducer = combineReducers({
    loading : loadingReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

