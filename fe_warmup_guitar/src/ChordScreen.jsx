import * as React from "react" ;

// useDispatch : to dispatch actions  | useSelector : to read data from the store
import { useSelector, useDispatch } from 'react-redux'

// REDUX ACTIONS
import { display_answer, reset_answer } from "./reduxSlices/answerSlice";
import { create_timer } from "./reduxSlices/currentTimerSlice";
import { switch_off_delay,new_value_typed, new_delay_confirmed } from "./reduxSlices/delaySlice";
import { update_chord_or_note } from "./reduxSlices/noteSlice";

const ChordScreen = () => {

// REDUX STATES
    const answer = useSelector(state => state.answer); // Checked
    const current_timer_bis = useSelector(state => state.timer);
    const delay = useSelector(state => state.delay);
    const note = useSelector(state => state.note); // Checked
    const dispatch = useDispatch(); 

// MAIN VARIABLES

    const all_notes = ["A", "B", "C", "D", "E","F", "G"];
    const all_chords = {
        6 : "E",
        5 : "A",
        4 : "D",
        3 : "G", 
        2 : "B",
        1 : "E", 
    }; 
    
// STATES
    // required to store the current Timer ID.
    // We will use it to identify the timer we need to stop with the stop() method of the class Timer
    const [current_timer, set_current_timer] = React.useState(null);


//CORE FUNCTIONS

    // DISPLAY RANDOM NOTE TO PLAY ON A RANDOM CHORD
    const mysterious_note = () => {
        console.log("MYSTERIOUS_NOTE CALLED");        
        const random_index_note = Math.floor(Math.random() * all_notes.length);
        const random_note = all_notes[random_index_note];
/*         set_note(random_note);
 */        dispatch(update_chord_or_note({
            property :"note",
            value : random_note,
        }))
        // Choose a random chord
        const chords_name = Object.keys(all_chords);
        const random_index_chord = Math.floor(Math.random() * chords_name.length);
        const random_chord_number = chords_name[random_index_chord];
/*         set_chord(random_chord_number);
 */        dispatch(update_chord_or_note({
            property :"chord",
            value : random_chord_number,
        }))
        console.log(random_note + random_chord_number);
        // Create a new Timer (will be started in the useEffect (see below))
        const next_timer = new Timer(delay.time_note_visible);
/*         set_current_timer(next_timer);   */
        dispatch(create_timer(next_timer));
   
    };


// DISPLAY THE RIGHT FRET TO BE PLAYED => The fret where the user should put his/her finger to produce the right note.
    // input : 1 - the number corresponding to the chord (1, 2, 3...etc). | 2 - The note to play (A, B, C#...etc),
    // output :  the fret to play on the given chord (a number.)
    const right_fret = (number_of_chord, note_to_play) => {
        console.log("RIGHT FRET CALLED");
        dispatch(reset_answer())
        let fret_to_play;
        console.log(`INPUT RIGHT_FRET: ${number_of_chord} ${note_to_play}`);
        //a - note_to_play = E   || open_chord_note = 5 ==> We deduce that open_chord_note = A.
        const open_chord_note = all_chords[number_of_chord];  // output expected : an open chord letter (E, A, D, G, B, E)
        // b - Between A and E there is ALWAYS a distance of 7 half-step/ frets (this the meat of the algorithm).
        const chords_grid = {
            A : 0,
            A_sharp : 1,
            Bb : 1,
            B : 2,
            C : 3,
            C_sharp : 4,
            Db : 4,
            D : 5, 
            D_sharp : 6,
            Eb : 6, 
            E : 7,
            F : 8,
            F_sharp : 9,
            Gb : 9,
            G : 10,
            G_sharp : 11,
            Ab : 11,
        }
        // c - the computation of the fret to play
        const number_of_intervals = 12;                 // Why 12 ? Because 12 is the total number of interval (remember C_sharp = Db are the same note!). If we count 12 intervals, we get back to the same note. 
        if (chords_grid[note_to_play] > chords_grid[open_chord_note]) {
            // We just need to compute the interval between the 2 chords to know which fret should be played
            fret_to_play = chords_grid[note_to_play] - chords_grid[open_chord_note];
        }else {
            // In that case we need to reach (it makes sense if you write the object chord_grid on a piece of paper and count the interval - try with open_chord_note = G and note_to_play = C for example
            fret_to_play = number_of_intervals - chords_grid[open_chord_note] + chords_grid[note_to_play]; 
        }
        console.log(`FRET TO PLAY : ${fret_to_play}`);
        dispatch(display_answer(fret_to_play));
    };



    // THE TIMER CONSTRUCTOR - 
    // Everytime x second we create a new object with this constructor
    class Timer {
        constructor(delay) {
            this.delay = delay;
            this.timerId = null;   
        }
        // trigger this timer. When delay is elapsed we call mysterious_note().
        start() {
            this.timerId = setTimeout(mysterious_note, this.delay);  // With timerId we have a way to identify the setTimeout function, we need that to stop the right timer with the method stop()
            console.log(`TimerID(start) : ${this.timerId}`);
            return this.timerId;
        }
        // stop this timer.
        stop() {
            clearTimeout(this.timerId);
            console.log(`We are cancelling this timer : ${this.timerId}`);
        };
    }


React.useEffect( () => {
    console.log(`note : ${JSON.stringify(note)}`);
}, [note])

// SIDE EFFECTS ()
    // Create the initial timer during the first render
    React.useEffect ( () => {
        let initial_timer = new Timer(delay.time_note_visible);
        /* set_current_timer(initial_timer); */
        dispatch(create_timer({initial_timer}));


    }, []);

    // If a timer exists, we trigger the current_timer we just set using the method start().
    React.useEffect( () => {
        if (current_timer !== null) {
            console.log(`current Timer : ${JSON.stringify(current_timer)}`);
            current_timer.start();
        }
    }
    , [current_timer]);
    
    // When the user set a new value for the timer, we stop the current timer and set a new one with the updated value for delay.
    React.useEffect( () => {
        console.log(`new delay : ${JSON.stringify(delay)}`);
        if (delay.new_timer) {          // with this conditional we are sure to update the timer if and only if the user explicitly send the form.
            // 1 - We stop the former timer
            current_timer.stop();
            // 2 - We create a new timer with the new value of timer
            let new_timer = new Timer(delay.time_note_visible);
/*             set_current_timer(new_timer); */
            dispatch(create_timer(new_timer));

            // 3 - We switch the property new_timer to false
/*             set_delay({
                ...delay,
                new_timer : false,
            }) */
            dispatch(switch_off_delay);
        }
    }, [delay.time_to_reply]);

    // Reset the value of the state answer. After a given amount of time display the solution
    React.useEffect ( () => {
            dispatch(reset_answer());
            setTimeout(right_fret.bind({}, note.chord, note.note), delay.time_note_visible - delay.duration_answer_visible); // BIND() to pass in parameters to setTimeout's callback - 5000 ? Because we display the answer during the last 5 seconds when the note is visible. For example : The instance set the timer to last 5000ms ==>delay.note_visible = 10000ms ==> we want to display the answer during the last 5000ms(the user has 5000ms to reply).
    }, [note.note, note.chord]) 

    
// HANDLER FUNCTIONS
    // Update the value of delay 
    const update_timer = (event) => {
        console.log(event.target.value)
/*         set_delay({
            ...delay,
            time_typed : event.target.value,
        }); */
        dispatch(new_value_typed(event.target.value))
    };

    // Confirm the value of the delay   
    const confirm_timer_value = (event) => {  
        console.log("boyo");  
        event.preventDefault();
/*         set_delay({
            ...delay,
            time_typed : 0,       // To reset the input form.    
            time_to_reply : delay.time_typed * 1000,
            time_note_visible : (delay.time_typed *1000) + duration_answer_visible,        // To include the time to display the right_fret
            new_timer : true, 
        }); */
        dispatch(new_delay_confirmed())
    }


    return (
        <>
            {!note.note || !note.chord ? (
                <h2>Loading</h2>
            ) : (
                <>
                    <span>{note.note}</span>
                    <span>{note.chord}</span>
                    <p>The answer {answer}</p>
                    <h5>Adjust the delay</h5>
                    <form onSubmit={confirm_timer_value}>
                        <input type="text" value={delay.time_typed} onChange= {update_timer} />
                        <input type="submit" value="Set a new timer" />
                    </form>
                </>
            )}
        </>
    );
};




export default ChordScreen;
