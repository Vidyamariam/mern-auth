import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import adminRducer from './user/adminSlice.js';
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

//react-persist- 
const rootReducer = combineReducers({
    user: userReducer,
    admin: adminRducer, // Add the admin reducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage, //this package will save the data in local storage of browser
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
         serializableCheck: false,  //this middleware is to avoid errors
     }),
}) 

export const persistor = persistStore(store);