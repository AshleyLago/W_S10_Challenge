import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    fullName: '',
    size: 'All',
    toppings: []
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        toggleSizeFilter(state, action) {
            state.size = action.payload;
        }
    }
})

export const {
    toggleSizeFilter,
} = ordersSlice.actions

export default ordersSlice.reducer