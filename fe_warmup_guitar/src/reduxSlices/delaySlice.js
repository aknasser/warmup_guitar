import { createSlice } from "@reduxjs/toolkit";

// By default, the answer is visible during the last 5000ms.
const duration_answer_visible = 3000;
// By default, when the app starts, the user gets 5000ms to find the right fret. After this delay the answer appears.
const default_time_to_reply = 8000;

// Delay : The time available to answer a question.


export const delay_slice = createSlice({
    name : "delay",
    initialState : {
        time_typed : "",            // Updated everytime while the user type a new value for the delay
        time_to_reply : default_time_to_reply,      // By default, when the app starts, the user gets 5000ms to find the right fret. After this delay the answer appears.
        duration_answer_visible : 3000, // By default, the answer is visible during the last 3000ms.
        time_note_visible : default_time_to_reply + duration_answer_visible,  
        new_timer : false,  
    },
    reducers : {
        switch_off_delay : state => {
            return state = {
                ...state,
                new_timer : false,
            }
        },
        // To check what the user is currently typing
        new_value_typed : (state, action) => {
            console.log("coucou")
            return state = {
                ...state,
                time_typed : action.payload,
            }
        },

        // Triggered when the user want to confirm a new value for the delay
        new_delay_confirmed : (state) => {
            return state = {
                ...state,
                time_typed : 0,       // To reset the input form.    
                time_to_reply : state.time_typed * 1000,
                time_note_visible : (state.time_typed *1000) + duration_answer_visible,        // To include the time to display the right_fret
                new_timer : true, 
            }
        },
    }
})

export const {switch_off_delay, new_value_typed, new_delay_confirmed} = delay_slice.actions
export default delay_slice.reducer;