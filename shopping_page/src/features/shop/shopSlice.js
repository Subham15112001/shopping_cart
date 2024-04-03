import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //items elements are object check https://fakestoreapi.com/docs for format
    items:[],
    total_amount:0,
    size:0,
    category:"",
}

const shopSlice = createSlice({
    name:"shop",
    initialState,
    reducers:{
        addItem:(state,action) => {
            //action payload refer to item in obj form
            state.items.push(action.payload);
        },
        updateTotalAmount:(state) =>{
            let total_amount = 0;
            let items = state.items;

            for(let i = 0;i<items.length;i++){
                total_amount = total_amount + items[i]?.price;
            }
        },
        removeItem:(state,action) => {
            let oldArray = state.items;
            let newArray = oldArray.filter((value,index) => {
                return value.id != action.payload;
            })
            state.items = newArray;
        },
        selectCategory:(state,action) => {
            state.category = action.payload;
        }
    }
})

export const {addItem,updateTotalAmount,removeItem,selectCategory} = shopSlice.actions;

export default shopSlice.reducer;