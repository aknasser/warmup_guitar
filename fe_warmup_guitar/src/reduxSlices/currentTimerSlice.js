import { createSlice } from "@reduxjs/toolkit";

// required to store the current Timer ID
// We will use it to identify the timer we need to stop with the stop() method of the class Timer


export const current_timer_slice = createSlice({
    name : "timer",
    initialState : null,
    reducers: {
        // Create a new timer, triggered a previous timer is elapsed 
        create_timer : (state, action) => {
                state = action.payload
        }
    }
})

export const {create_timer} = current_timer_slice.actions;

export default current_timer_slice.reducer;