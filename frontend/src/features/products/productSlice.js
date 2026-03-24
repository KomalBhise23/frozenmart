import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products";

const initialState = {
    products: products
}

const productSlice = createSlice({
   name: products,
   initialState,
    reducer: {}
})

export default productSlice.reducer;