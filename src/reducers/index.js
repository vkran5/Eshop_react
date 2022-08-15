import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import {productReducer} from './productReducer'
import { categoryReducer } from './categoryReducer';
import reduxThunk from 'redux-thunk';

export const rootStore = configureStore({
    // untuk mengelompokan reducer yang dibuat 
    reducer: {
        userReducer,
        productReducer,
        categoryReducer
    }
}, applyMiddleware(reduxThunk))