import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { isCartVisible: false },
    reducers: {
        toggleCart(state) {
            state.isCartVisible = !state.isCartVisible;
        }
    }
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice;
