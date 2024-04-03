import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {url} from "../../faker_url";
import { useSelector } from "react-redux";

const initialState = {
    all_categories:[],
    specific_category:"",
    products:[],
    product:{},
}

export const get_products = createAsyncThunk('cart/get_products', async (product_category,thunkAPI) => {
    console.log(product_category)
    const products_url = url.single_category(product_category);
    console.log(products_url)
    return await fetch(products_url)
                 .then((response) => {                 
                    return response.json();
                })
                 .catch((err) => console.log(err));    
})

export const get_product = createAsyncThunk('cart/get_product',async (product_id,thunkAPI) => {
    const product_url = url.single_product(product_id);

    return await fetch(product_url)
                 .then((response) => response.json())
                 .catch((err) => console.log(err));
})

export const get_all_categories = createAsyncThunk('cart/get_all_categories',async () => {
    const all_categories_url = url.all_categories;

    return await fetch(all_categories_url)
                 .then((response) => response.json())
                 .catch((err) => console.log(err));
})


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        set_category:(state,action) => {
            state.specific_category = action.payload;
        },
        delete_category:(state) => {
            state.specific_category = [];
        }
    },

    extraReducers:(builder) => {

        builder.addCase(get_products.fulfilled,(state,action) => {
            state.products = action.payload;
        })

        builder.addCase(get_product.fulfilled, (state,action) => {
            state.product = action.payload;
        })

        builder.addCase(get_all_categories.fulfilled,(state,action) => {
            state.all_categories = action.payload;
            console.log(action.payload)
        })
    }
})

export const {set_category,delete_category} = cartSlice.actions;
export default cartSlice.reducer;
 