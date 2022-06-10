import { configureStore } from "@reduxjs/toolkit";
import answer_reducer from "./answerSlice"
import current_timer_reducer from "./currentTimerSlice"
import delay_reducer from "./delaySlice"
import note_reducer from "./noteSlice"

export default configureStore({
    reducer : {
      answer : answer_reducer,
      curent_timer : current_timer_reducer,
      delay: delay_reducer,
      note : note_reducer,  
    }
});