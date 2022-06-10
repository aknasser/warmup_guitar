import { createSlice } from "@reduxjs/toolkit";

const note_slice = createSlice({
    name : "note",
    initialState : {
        chord : "6",
        note : "G",
    },
    reducers : {
        update_chord_or_note : (state, action) => {
                return state = {
                    ...state,
                    [action.payload.property] : action.payload.value
                }

        },
    }
})

export const {update_chord_or_note} = note_slice.actions;
export default note_slice.reducer;