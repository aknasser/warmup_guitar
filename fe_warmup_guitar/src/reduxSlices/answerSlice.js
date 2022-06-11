import { createSlice } from "@reduxjs/toolkit";

// The logic is quite similar to useReducer from React.js
export const answer_slice  = createSlice({
    name : "answer",
    initialState : "",
    reducers : {
        display_answer : (state, action) => {
            return  action.payload;
        },
        reset_answer : state => {
            return  ""
        },
    }
})

export const {display_answer, reset_answer} = answer_slice.actions;

export default answer_slice.reducer;
