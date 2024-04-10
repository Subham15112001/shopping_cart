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
            let temp = state.items;
            temp.push(action.payload);
            state.items = temp;

        },
        updateTotalAmount:(state) =>{
            let total_amount = 0;
            const items = state.items;

            for(let i = 0;i<items.length;i++){
                total_amount = total_amount + (items[i]?.price)*(items[i]?.size);
            }
            state.total_amount = total_amount;
        },
        removeItem:(state,action) => {
            let oldArray = state.items;
            let newArray = oldArray.filter((value,index) => {
                return value.id != action.payload;
            })
            state.items = newArray;
        },
        increaseSize:(state,action) => {
            const id = action.payload;
            let items = state.items;
            for(let i = 0;i<items.length;i++){

                if (items[i].id === id) {
                    items[i].size++;
                }

            }
            state.items = items;
        },
        decreaseSize:(state,action) => {
            const id = action.payload;
            let items = state.items;
            for(let i = 0;i<items.length;i++){

                if(items[i].id === id){
                        items[i].size--;
                }
            }
            state.items = items;
        },
        selectCategory:(state,action) => {
            state.category = action.payload;
        },
        clearData:(state) => {
            state.items = [];
        }
    }
})

export const {addItem,updateTotalAmount,removeItem,selectCategory,increaseSize,decreaseSize,clearData} = shopSlice.actions;

export default shopSlice.reducer;