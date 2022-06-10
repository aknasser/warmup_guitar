import { configureStore } from "@reduxjs/toolkit";
import answer_reducer from "./answerSlice"
import delay_reducer from "./delaySlice"
import note_reducer from "./noteSlice"

export default configureStore({
    reducer : {
      answer : answer_reducer,
      delay: delay_reducer,
      note : note_reducer,  
    }
});