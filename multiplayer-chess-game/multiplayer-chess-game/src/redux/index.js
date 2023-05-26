import {configureStore} from "@reduxjs/toolkit";
import cartReducer from './reducer1';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})