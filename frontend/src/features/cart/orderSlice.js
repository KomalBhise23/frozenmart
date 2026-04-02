import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    orderList : JSON.parse(localStorage.getItem("orders")) || []
}
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
        addOrder:(state, action)=>{
            const newOrder = {
                ...action.payload,
                id: Date.now(),
                createdAt: new Date().toISOString()
            }
            state.orderList.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(state.orderList))
        }
    }
})
export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;