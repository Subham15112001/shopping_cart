import { configureStore } from "@reduxjs/toolkit";
import  cartReducer  from "../features/cart/cartSclice";
import userReducer from '../features/user/userSlice';
import shopReducer from '../features/shop/shopSlice';
export const store = configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer,
        shop:shopReducer,
    },
})